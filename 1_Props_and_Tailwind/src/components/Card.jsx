import React from 'react'


// Props'ta Card function'ına parametre olarak props yazıp Card'a verilmiş değerleri çağrırırz.
// Ya da Card'a parametre olarak Card({name, title}) ile ilgili verileri verip props yazmak durumunda kalmayız.
function Card({name,title,myObj}) {
    return (
        <div>
            <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
                <img className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="https://avatars.githubusercontent.com/u/42476890?v=4" alt="" width="384" height="512"/>
                    <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                        <blockquote>
                            <p className="text-lg font-medium">
                                “Tailwind CSS is the only framework that I've seen scale
                                on large teams. It’s easy to customize, adapts to any design,
                                and the build size is tiny.”
                            </p>
                        </blockquote>
                        <figcaption className="font-medium">
                            <div className="text-sky-500 dark:text-sky-400">
                                 {name || "halilkrkn"}
                            </div>
                            <div className="text-slate-700 dark:text-slate-500">
                                {title}
                            </div>
                            <div className="text-slate-700 dark:text-slate-500">
                                {myObj.address.country}
                            </div>
                        </figcaption>
                    </div>
            </figure>
        </div>
    )
}


export default Card

