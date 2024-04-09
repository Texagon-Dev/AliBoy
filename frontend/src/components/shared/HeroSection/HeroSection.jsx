import React from 'react'
import './Hero.css'
import { Button } from '@/components/ui/button'
const HeroSection = () => {
    return (
        <div className='min-h-[100vh] md:min-h-[1000px] max-h-max  hero relative bg-red-300  '>
            <div className='container '>
                <h1 className='max-w-[720px] arvo-bold h1'>Unleash Your Imagination with AI Story Creation</h1>
                <p className='max-w-[625px] text-[28px]'>
                
                Experience the magic of AI-generated storytelling. Simply provide prompts and watch captivating tales come to life before your eyes
                </p>
                <Button>Start Creating</Button>
            </div>
            <img
                className='absolute right-0 w-3/4 md:bottom-0 md:w-1/2 '
                src='/src/assets/images/hero.png'
            />
        </div>
    )
}

export default HeroSection
