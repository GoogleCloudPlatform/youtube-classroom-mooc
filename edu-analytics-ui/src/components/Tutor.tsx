import { Divider, Grid } from "@material-ui/core";

interface Tutor  {

}

const Tutor : React.FunctionComponent<Tutor> = ({

})=>{
    return(
        <>
           <Grid container alignContent="center">
                <div> Search bar Area</div>
           </Grid>
           <Divider></Divider>
           <Grid container direction="column" lg={8} md={8}>
               <Grid item  lg={8} md={8}>
                   <div>Video Content</div>
               </Grid>
               <Divider orientation="vertical" />
               <Grid item  lg={4} md={4}>
                    <div>Other content</div>
               </Grid>
           </Grid>
        </>
    )
}

export default Tutor;