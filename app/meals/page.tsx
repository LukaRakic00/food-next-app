import Link from 'next/link';
import { Suspense } from 'react';

import classes from './page.module.css'; 
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals'; 

// ovo je za davanje imena tabu kada udjemo na rutu meals, znaci ovo je staticki uradicu za mealDeatils page dinamicki
export const metadata = {
    title: 'All Meals',
    description: 'Browse the delicious meals share by our vibrant community.',
};

// ova komponenta hvata obroke
async function Meals() {
    const meals = await getMeals(); 

    return <MealsGrid meals={meals}/>
}

export default function MealsPage() { // moramo da asinhrono da izvrsavamo 
    return (
    <>
        <header className={classes.header}>
            <h1>
                Delicious meals, created{' '}
                <span className={classes.highlight}>by you</span>
            </h1>    
            <p>
                Choose your favorite recipe and cook it yourself.It is easy and fun!
            </p>

            <p className={classes.cta}>
                <Link href="/meals/share">
                  Share Your Favorite Recipe  
                </Link>
            </p>
        </header> 
        <main className={classes.main}>
            <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
                <Meals />  
            </Suspense>  
        </main>
    </>
    ); 
}