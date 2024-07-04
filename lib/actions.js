'use server';
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return !text || text.trim() === ''; 
}

export async function shareMeal(prevState, formData) {
    // ovo se koristi kada je server u pitanju 
      const meal = {
          title: formData.get('title'), 
          summary: formData.get('summary'),
          instructions: formData.get('instructions'),
          image: formData.get('image'), 
          creator: formData.get('name'), 
          creator_email: formData.get('email')
      }; 

      // hendlujemo da ne sme polje da bude prazno, recimo u bazi smo stavili required ali to moze da se promeni u inspect element tako da moramo da hendlujemo i to 
    if(
      isInvalidText(meal.title) || 
      isInvalidText(meal.summary) || 
      isInvalidText(meal.instructions) || 
      isInvalidText(meal.creator) || 
      isInvalidText(meal.creator_email) ||
      !meal.creator_email.includes('@') ||
      !meal.image || 
      meal.image.size === 0
    )  {
       return {
          message: 'Invalid input.'
       }; 
    }


    await saveMeal(meal);
    // da bi nam automatksi kkada popunimo formu moglo da uradi redirekciju ponovo na istu samo naravno praznu formu 
    
    revalidatePath('/meals'); //za kes u pprodukciji kada radimo 
    redirect('/meals');
}