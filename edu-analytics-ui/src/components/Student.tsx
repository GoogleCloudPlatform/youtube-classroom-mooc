import React from 'react';
import { Tab, Tabs, Grid, Divider, Typography } from '@material-ui/core';


import StudentCard from '@/components/TutorCard';



interface Student {

}

const Student: React.FunctionComponent<Student> = ({

}) => {
    const [tabValue, setTabValue] = React.useState('Assigned');
    const [assigmentList,setAssignmentList] = React.useState([]);

    const handleChange = (event, newValue) => {
        setTabValue(newValue); 
    };

    React.useEffect(()=>{
        //Call the web api and assign the result to assigmentList
    },[tabValue])

    const displayAllAssigments = ()=>{
        return(
            <div>List of assigment</div>
        )
    };
    return (
        <>
            <Grid>
                <Grid container item
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    <Grid item>
                        <Tabs
                            value={tabValue}
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                        >
                            <Tab value="Assigned" label="Assigned" />
                            <Tab value="In Progress" label="In Progress" />
                            <Tab value="Completed" label="Completed" />
                        </Tabs>
                    </Grid>
                </Grid>
                <Divider></Divider>
                <Grid container direction='row' item>
                    <Grid item lg={12} sm={12} md={12}>
                        <Typography variant='h6' >
                            {tabValue === 'Assigned' ? 'Not Started' : tabValue}
                        </Typography>
                    </Grid>
                    <Grid item>
                        {assigmentList.length === 0 ? <p>There are no assigments in this section.</p> : {displayAllAssigments}}
                    </Grid>

                </Grid>
            </Grid>
        </>
    )
}

export default Student;