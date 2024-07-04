import classes from './loading.module.css'

// radi isto kao suspense 
export default function MealsLoadingPage() {
    return <p className={classes.loading}>Fetching meals...</p>
}