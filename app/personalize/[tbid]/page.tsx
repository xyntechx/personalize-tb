const Personalize = ({ params }: { params: { tbid: string } }) => {
    return (
        <main className="w-screen min-h-screen flex items-center justify-center flex-col p-4">
            <h1>{params.tbid}</h1>
        </main>
    );
};

export default Personalize;
