


const LandingLayout=({children}:{children:React.ReactNode})=>{

    return(
        <main className="h-full overflow-auto w-full">
            <div className="mx-auto h-full w-full max-w-screen-xl">
                {children}
            </div>
        </main>
    )


}

export default LandingLayout