export default function About() {
    return (
        <section className="sm:mt-48 flex flex-col justify-center items-center">
            <h2 className="font-semibold text-3xl mb-3">What is this for?</h2>
            <p className="text-balance text-center max-w-[60ch]">
                This application allow developers test their webhook in a local
                environment without the need to host the backend on a domain.
            </p>
        </section>
    );
}
