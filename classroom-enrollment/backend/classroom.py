from __future__ import print_function

import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/classroom.courses.readonly',
          'https://www.googleapis.com/auth/classroom.rosters']


"""Shows basic usage of the Classroom API.
Prints the names of the first 10 courses the user has access to.
"""
creds = None
# The file token.json stores the user's access and refresh tokens, and is
# created automatically when the authorization flow completes for the first
# time.
if os.path.exists('token.json'):
    creds = Credentials.from_authorized_user_file('token.json', SCOPES)
# If there are no (valid) credentials available, let the user log in.
if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    else:
        flow = InstalledAppFlow.from_client_secrets_file(
            'credentials.json', SCOPES)
        creds = flow.run_local_server(port=3008)
    # Save the credentials for the next run
    # with open('token.json', 'w') as token:
    #     token.write(creds.to_json())


def get_courses():
    service = build('classroom', 'v1', credentials=creds)
    try:
        service = build('classroom', 'v1', credentials=creds)

        # Call the Classroom API
        results = service.courses().list(pageSize=10).execute()
        courses = results.get('courses', [])

        if not courses:
            print('No courses found.')
            return
        return courses
    except HttpError as error:
        print('An error occurred: %s' % error)


def enroll_student(student_email, course_id, enrollment_code):
    service = build('classroom', 'v1', credentials=creds)
    status = False
    try:
        student = {
            'userId': student_email
        }

        course_id = course_id
        student = service.courses().students().create(
            courseId=course_id,
            enrollmentCode=enrollment_code,
            body=student).execute()
        print(
            '''User {%s} was enrolled as a student in
            the course with ID "{%s}"'''
            % (student.get('profile').get('name').get('fullName'),
               course_id))
        status = True
    except HttpError as error:
        print('An error occurred: %s' % error)

    return status


def main():
    try:
        service = build('classroom', 'v1', credentials=creds)

        # Call the Classroom API
        results = service.courses().list(pageSize=10).execute()
        courses = results.get('courses', [])

        if not courses:
            print('No courses found.')
            return
        # Prints the names of the first 10 courses.
        print('Courses:')
        for course in courses:
            print(course["name"], course["id"], course["alternateLink"])

        enroll_status = enroll_student("student@sakunchala.altostrat.com",
                                       "520709412969", "mhj7kfr")
        print("Enrollment status", enroll_status)

        # enroll student

    except HttpError as error:
        print('An error occurred: %s' % error)


if __name__ == '__main__':
    main()
