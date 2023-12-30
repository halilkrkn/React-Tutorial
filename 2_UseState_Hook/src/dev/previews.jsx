import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import App from "../App.jsx";
import Greeting from "../components/Greeting.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/Greeting">
                <Greeting/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews