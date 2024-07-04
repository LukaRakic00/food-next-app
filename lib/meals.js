import fs from 'node:fs'; // dozvoljava da radimo sa fajlovima u sistemu file system

import sql from 'better-sqlite3'; 
import slugify from 'slugify';
import xss from 'xss'; 
import { error } from 'node:console';

const db = sql('meals.db'); 


export async function getMeals() { // mora da se izvrsava asinhrono
    await new Promise((resolve) => setTimeout(resolve, 3000));  // odredjeno kasnjenje 3 sekunde
    
    // throw new Error('Loading meals failed');
    return db.prepare('SELECT * FROM meals').all(); // run je da menjamo, a all je da sve pokrenemo fetch, jedna kolona je get()
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug); // stiti od sql injekcije 
}

// treba nam slug i instaliramo slugify
// bun install slugify xss
// xss nas stiti od napada ko npr ovo:  
//                      dangerouslySetInnerHTML={{
//                      __html: meal.instructions,

// slika mora da bude u sistemu ne u bazi zato cu da je sacuvam na lokaciji public/images

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true }); 
    meal.instructions = xss(meal.instructions); 

    const extension = meal.image.name.split('.').pop(); // podelio sam sliku da bi odvojio ekstenziju od imena
    const fileName = `${meal.slug}.${extension}`

    const stream = fs.createWriteStream(`public/images/${fileName}`)
    // moramo da baferujemo sliku, da je stavimo u bafer
    const bufferedImage = await meal.image.arrayBuffer(); 

    // prima 2 argumenta
    // prvi je bafer slike 
    // drugi je fcija za rukovanje izuzecima
    stream.write(Buffer.from(bufferedImage), (error) => {
        if(error) {
            throw new Error('Saving image failed!'); 
        }
    }); 

    meal.image = `/images/${fileName}` // mora da bude ukljucen images folder u public folderu

    // ovde stavljamo sve u bazu bez id jer je automatski 
    // ${} ovakav pristup bi bio ranjiv pa koristimo sledeci 
    // pozivamo run preko prepare
    // mora da bude isto redosled values i sta se stavlja u bazu 
    db.prepare(`
        INSERT INTO meals
            (title, summary, instructions, creator, creator_email, image, slug)
            VALUES (
                @title,
                @summary,
                @instructions,
                @creator,
                @creator_email, 
                @image,
                @slug         
        )
    `).run(meal); 
}