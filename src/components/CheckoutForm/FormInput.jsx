import {TextField, Grid, InputLabel} from '@material-ui/core';
import {useFormContext, Controller} from 'react-hook-form';


const FormInput = ({name, label}) => {
    const {control} = useFormContext();

    return (
        <Grid item xs={12} sm={6}>
            <InputLabel>{label}</InputLabel>
            <Controller render={({field}) => <TextField {...field} />} control={control} fullWidth name={name} required/>
        </Grid>
    )
}

export default FormInput
