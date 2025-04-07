import React from 'react';
import { Header } from '@/components/Header';
import { getCharacterById } from '@/services/characters';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface CharacterPageProps {
    //cada vez que se haga una peticion a la pagina se va a ejecutar esta funcion
    //siempre debemos usar Promise cuando vamos a trabajar con await
    params: Promise<{ id: string }>;
}

//Si queremos que al momento de compilar nuestro site se genere un archivo estatico
//y no se haga una peticion a la api cada vez que se visite la pagina
//debemos usar la funcion generateStaticParams
//y en el archivo next.config.js debemos agregar la propiedad generateStaticParams: true

export const generateStaticParams = async () => {
        return [
            { id: '1' },
            { id: '2' },
            { id: '3' },
        ]
}


export const generateMetadata = async ({ params }: CharacterPageProps): Promise<Metadata> => {
    //Mantener metadata actualizada: de forma dinamica vamos a mostrar el nombre del personaje
    //en la pestaña del navegador, siempre debemos usar la constante generateMetadata
    //Next.js se encarga de generar el archivo estatico con el nombre del personaje
    const { id } = await params;
    const character = await getCharacterById(id);

    return {
        title: character.name,
    }

}

//Parametros de la pagina
export default async function CharacterPage({ params }: CharacterPageProps) {

    const { id } = await params;
    const character = await getCharacterById(id);

    if (character.id === undefined) {
        notFound();
    }


    return (
        <div>
            <Header />
            <section className='max-w-2xl mx-auto p-5 flex'>
                <div>
                    <Image className='h-90 object-contain mx-auto min-w-72' src={character.image} alt={character.name} width={500} height={500} />
                </div>
                <div>
                    <h1 className='text-3xl font-bold mb-5'>{character.name} <small className='font-thin text-sm'>{character.race}</small> </h1>
                    <p>
                        {character.description}
                    </p>
                </div>



            </section>
            <hr className='pb-5'/>
            <div className='text-center'>
                <Link className='border-blue-400 text-blue-400 p-5 rounded' href={"/"} >Volver al Inicio</Link>
            </div>
        </div>
    );


}

