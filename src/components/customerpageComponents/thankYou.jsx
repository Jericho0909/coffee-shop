import HappyCat from "../../assets/gif/happy-cat-happy-happy-cat.gif"
import { Coffee } from 'lucide-react';
import { Heart } from 'lucide-react';
const Thankyou = () => {
    return(
        <div className="container-flex justify-center flex-col w-full h-[80%] p-1 mb-0">
            <div className="w-[15rem] h-auto mb-3">
                <img
                    src={HappyCat}
                    alt="Happy Cat"
                    className="w-auto h-auto"
                    loading="lazy"
                />
            </div>
            <p className="container-flex mb-0 text-[1.10rem] gap-1">
                <Coffee color="#8c6244" size={28} strokeWidth={2.5}/>Thank you for ordering at  
                    <strong 
                        className="text-[#8c6244] text-[1.50rem] pl-1"
                        style={{
                            textShadow: "0 0 2px #8c6244, 0 0 6px #8c6244",
                        }}
                    >
                        Kape Na
                    </strong>
            </p>
            <p className="container-flex mb-0 italic text-[0.90rem]">
                We’re brewing your drink with love!<Heart color="red" size={18} strokeWidth={2.5} fill="red"/>
            </p>
        </div>
    )
}

export default Thankyou