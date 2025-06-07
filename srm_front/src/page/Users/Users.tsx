import ContentItem from "../../components/ContentItem/ContentItem";
import userData from "../../data.json";

function Home() {
    const id: number = userData.id
    const FirstName: string = userData.FirstName
    const secondName: string = userData.secondName
    const age: number = userData.age
    return (
        <ContentItem id={id} firstName={FirstName} secondName={secondName} age={age} />
    );
}

export default Home;