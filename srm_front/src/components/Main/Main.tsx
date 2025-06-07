import ContentItem from "../ContentItem/ContentItem";
import FilterItem from "../FilterItem/FilterItem";
import userData from "../../data.json";

function Main() {
    const id: number = userData.id
    const FirstName: string = userData.FirstName
    const secondName: string = userData.secondName
    const age: number = userData.age
    return (
        <main className="flex-1 p-6 bg-gray-400">
            <h1 className="text-center font-bold text-3xl">SRM</h1>
            <FilterItem />
            <div className="container p-2">
                <ContentItem id={id} firstName={FirstName} secondName={secondName} age={age} />
            </div>
        </main>
    );
}

export default Main;