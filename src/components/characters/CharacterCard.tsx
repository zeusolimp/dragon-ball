import { Character } from '@/model/character.model';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CharacterCardProps {
    character: Character
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
    return (
        <div className='flex flex-col p-3 border border-gray-200 rounded text-center'>
            <Link href={`/character/${character.id}`}>
                <Image
                    className='h-60 w-auto object-contain mx-auto'//siempre que definimos un valo a h se recomienda el w en auto para que se ajuste al tamaño de la imagen
                    src={character.image}
                    alt={character.name}
                    width={500}//No es tamaço sino calidad de la imagen
                    height={500} //No es tamaço sino calidad de la imagen
                    priority={character.id>5} // prioriza la carga de las primeras 5 imagenes
                    />
                <h3>
                    {character.name}
                </h3>
            </Link>
        </div>
    );
}
