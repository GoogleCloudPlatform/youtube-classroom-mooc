


interface StudentCard {
    thumbNail: string,
    caption: string,
    timeStamp: string,
}

const StudentCard: React.FunctionComponent<StudentCard> = ({ thumbNail, caption, timeStamp }) => {
    return (
        <div className="card card-side bg-base-100 shadow-xl">
        <figure><img src={thumbNail} /></figure>
        <div className="card-body">
          <p>{caption}</p>
          <p>{timeStamp}</p>
        </div>
      </div>
    )
}

export default StudentCard;