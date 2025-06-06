import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { cn } from '@/lib/utils'
import { ArrowRightIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function Landing() {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center mx-auto px-3'>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
  <div className="z-10 flex min-h-64 items-center justify-center">
      <div
        className={cn(
          "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>✨ Introducing Magic UI</span>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
      </div>
    </div>
    <ContainerScroll>
      <Image 
      src='/home.png'
      alt='home image'
       width={800}
       height={800}
       className='border-2 rounded-2xl'
      />
    </ContainerScroll>
    </div>
  )
}

export default Landing