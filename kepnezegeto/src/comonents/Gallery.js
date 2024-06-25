import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Gallery() {
    const [index, setIndex] = useState(0);
    const [images, setImages] = useState([
        require("../images/image1.jpg"),
        require("../images/image2.jpg"),
        require("../images/image3.jpg"),
        require("../images/image4.jpg")
    ]);

    const forward = ()=> {
        setIndex(i=>++i);
    };

    const backward = ()=> {
        setIndex(i=>--i);
    };

    return (
        <div className="img-gallery">
            <img src={images[index]} />
            <img style={{left:"-100%", position: "absolute"}}src={images[index > 0 ? index-1 : images.length-1]} />

            <div className="right-icon" onClick={()=>forward}>
                <FontAwesomeIcon icon="fa-solid fa-circle-right" />
            </div>
            <div className="left-icon" onClick={()=>backward}>
                <FontAwesomeIcon icon="fa-solid fa-circle-left" />
            </div>
        </div>
    );
}

export default Gallery;

/*
Ez egy képnézegeő lesz és majd úgy fognak menni a képek, hogy jobbról balra átcsússzannak!! 

itt is használni fogjuk majd a fontawesome-os ikonokat, de viszont a react-router-dom az nem kell 

Elöször megoldjuk a css részét meg kellenek képek is, ezeket leszedjük a pexels-ről!!! 
Csináltunk neki egy mappát, ahova beraktuk ezeket a képeket -> images 

Csinálunk egy images-es useState-s változót, ami egy tömb lesz és ebben a tömbben lesznek a képek nevei
fontos, hogy ezt meg kell alapból require()-vel csinálni, mert itt a React-ban majd kell egy img src-jének a require() minden esetben!!! 
-> 
    const [images, setImages] = useState([
        require("../images/image1.jpg"),
        require("../images/image2.jpg"),
        require("../images/image3.jpg"),
        require("../images/image4.jpg")
    ]);

megnézzük, hogy megjelenik-e egyáltalán {images[0]}
->
    return(
        <div className="">
            {images[0]}
        </div>
    );

persze ehhez az App.js-t is meg kell csinálni!! 
-> 
import "./styles/style.scss";
import Gallery from './comonents/Gallery';

function App() {
    return(
        <Gallery/>
    );
}

export default App;

még nem lett jó, mert csak annyit csinál a require, hogy az elérési útvonalat mutatja
és ezt kellene nekünk úgy, hogy csinálunk egy img tag-et és azon belül megadjuk a src-jében az images[0]-t 
->
    return(
        <div className="">
            <img src={images[0]}/>
        </div>
    );

most be is töltödött, de ez egy hatalmas kép, ezért keretek közé szorítjuk, erre csináltunk egy img-gallery osztályt! 
->
    return(
        <div className="img-gallery">
            <img src={images[0]}/>
        </div>
    );

.img-gallery {
    max-width: map-get($sizes, "lg");
    margin: 15px auto;

    img {
        width: 100%;
    }
}

megadtunk egy width-et a img-gallery-nek meg egy margin-t és ami fontos, hogy beágyazva meg tudjuk adni, hogy a benne lévő img, pedig legyen 
width: 100%!!! 

És itt azt kell majd megoldani, hogy ennek mindig legyen egy height-ja és ilyenkor kell ha be van állítva height, hogy az img-nek a height-ja 
legyen 100% és még azt is, hogy object-fit:cover !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
és még adunk egy border-t a img-gallery-nek 
->
.img-gallery {
    max-width: map-get($sizes, "lg");
    margin: 15px auto;
    height: 720px;
    border: 2px solid map-get($colors, "secondary");

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

A következő dolog, hogy kellenek nekünk a jobb meg a bal ikon!! 
Felmegyünk a fontawesome-ra és keresünk egy next és egy back ikont 
App-ban! 
-> 
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
library.add(faCircleRight);

és akkor ugyanígy lesz egy faCricleLeft is és ugyanúgy a solid-ból, nem úgy ahogy nekem itt van!!!! 
itt 
->
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

meg ahova kell majd ez az ikon 
<FontAwesomeIcon icon="fa-solid fa-circle-right" />

        <div className="img-gallery">
            <img src={images[0]}/>
            <FontAwesomeIcon icon="fa-solid fa-circle-right" />
            <FontAwesomeIcon icon="fa-solid fa-circle-left" />
        </div>

és akkor ott vannak az ikonok a kép alatt, ezért az image-gallery-nek adunk egy position: relative-ot!! 
.img-gallery {
    max-width: map-get($sizes, "lg");
    margin: 15px auto;
    height: 720px;
    border: 2px solid map-get($colors, "secondary");
    position: relative;

és csinálunk midnkét ikonnak egy div-et, hogy meg tudjuk adni neki egy class-t és majd elhelyezni egy position: absolute;
top, bottom, left, right-os dologgal, hogy hol legyenek pontosan!!!

            <div className="icon right-icon">
                <FontAwesomeIcon icon="fa-solid fa-circle-right" />
            </div>
            <div className="icon left-icon">
                <FontAwesomeIcon icon="fa-solid fa-circle-left" />
            </div>

és ezt lehet majd úgy is, hogy megadjuk egy %-jellel az icon-t és akkor majd megkapja a közös tulajdonságokat mindkettő!!! 
-> 
%icon {
    //ebbe összegyüjtjük a közös tulajdonságokat 
    width: 40px;
    height: 40px;
    //fontos, hogy a font-size is annyi legyen, mint a width meg height, mert akkor akkora lesz az ikon!! 
    font-size: 40px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto; 
    //hogy vertikálisan középen legyen
}

.left-icon {
    @extend %icon;
    left: 10px;
}

.right-icon {
    @extend %icon;
    right: 10px;
}

és akkor a icon class az nem is szükséges számunkra csak a left meg a right-icon!!! 
-> 
            <div className="right-icon">
                <FontAwesomeIcon icon="fa-solid fa-circle-right" />
            </div>
            <div className="left-icon">
                <FontAwesomeIcon icon="fa-solid fa-circle-left" />
            </div>

ott vannak, csak az a baj, hogy ezek alapból fekete színűek, ezért az %icon-nak megadunk egy secondary-s color-t
meg egy cursor: pointer is jól jön ide!!!  
color: map-get($colors, "secondary-lighter");
cursor: pointer;
******
És akkor ezzel lehet majd váltani és az alap képváltási mehanizmus az úgy müködik, hogy kell nekünk egy index, erre 
csinálunk egy index-es useState-s változót!! 

const [index, setIndex] = useState(0);

és amikor rákattintunk az ikonra, akkor vált, de erre csinálunk egy forward függvényt!!! 
    const forward = ()=> {
        setIndex(i=>++i);
    };

ugye a setIndex-nek növeljük egyel a indexét ebben a függvényben!!! 
és nem nulladikat hanem mindig az index-ediket fogjuk megjeleníteni!!!
<img src={images[0]} />
->
<img src={images[index]} />

Az ikonra meg csinálunk egy onClick-et, aminek megadjuk a forward-ot, hogy lemenjen!!!
            <div className="right-icon" onClick={()=>forward}>
                <FontAwesomeIcon icon="fa-solid fa-circle-right" />
            </div>

Tehát a lépések itt
1. csinálunk egy index-es useState-s változót, ami nulláról indul 
2. egy függvény amiben, ennek növeljük az értékét egyel 
3. megadjuk, ahol megjelenítjük, hogy hányadik indexű elemet mutassa majd -> <img src={images[index]} />
    ugye erre kellett az egész, hogy itt megadjuk és majd változni fog 
    mert a images egy tömb és majd itt vannak index-ek és ez alapján fogjuk megjeleníteni, hogy éppen a useState-s index-nek mennyi az értéke 
4. egy onClick-vek megadjuk az icon-nak, hogy ha erre kattintunk, akkor fusson le a forward függvény és akkor ott a index-et azt növeltük egyel 
    és akkor az egyel nagyobb indexű kép fog megjelenni!!!!! 

de az egésznek az alapja, hogy legyen egy tömb, amiben meg vannak a képek, elérési útvonallal, tehát a require()-vel!!! 

és akkor így már megy tovább, de még nem ellenőrizzük azt, hogy egyáltalán létezik-e az az indexű kép, tehát ez akkor is továbbb fog 
menni ha már nincs olyan indexű képünk!!! 

és lesz egy ugyanilyen backward függvény, ahol majd az index-et egyel csökkentjük és majd ezt megadjuk a másik ikonnak!!!
->
    const backward = ()=> {
        setIndex(i=>--i);
    };

    <div className="left-icon" onClick={()=>backward}>
        <FontAwesomeIcon icon="fa-solid fa-circle-left" />
    </div>

Itt azt kell majd megoldani, hogy ne is egyet töltsön be ezekből a képekből, hanem kettőt 
tehát legyen mindig az index-1-dik meg az index-edik, csak arra kell majd figyelni, hogy az index-1-dik az nem mindig létezik!!!! 
és ha az index-1 az -1 lenne, akkor azt kell csinálni, hogy az utolsó képet berakni!!! 
->
<img src={images[index]} />
<img src={images[index]} />

ha ezt így csináljuk, akkor egymás alatt lesznek majd a képek!!!! 
de itt majd a másodiknál alkalmazunk egy internal operator-t arra, hogyha az index < 0 akkor az index-1 jelenjen meg különben az utolsó 
mert ha az index nagyobb mint nulla az azt jelenti, hogy minimum egy és akkor az index-1 az nulladik indexű, de viszont ha nem akkor berakjuk 
a images.length-1-dik, tehát az utolsó képet!!! 
-> 
<img src={images[index]} />
<img src={images[index > 0 ? index-1 : images.length-1]} />

és mindig ha rányomunk a next gombra, akkor felül megjelenik az index-edik, alul meg az index-1-ig kép 
csak ezt nem így fogjuk megcsinálni, hanem úgy, hogy ami most alatta van kép az mellette lesz balra és egyszerűen csak átmegy majd balról jobbra 
majd az időzítéseknél lesz ez egy komoly kihívás, de lehet, hogy meg tudjuk azt oldani, hogy egy animációt létrehozunk neki, hogy az egyiknél 
minusz valamennyitől meg nulláig, a másik meg nullától ugyanannyit pluszba!!! 
két osztály, két animációval!!! 
és akkor ha ugyanolyan sebeséggel mozognak, csak az egyik hátrébb van mint a másik és ráadásul nem is látszik ami hátrébb van teljesen, mert 
beállítjuk majd overflow: hidden 

Ezek fontosak, hogy overflow: hidden meg fit-object: cover!!!!!!!!! 

styles.scss-ben felük létrehozzuk ezeket a keyframes-es animációkat!!!! 
-> 
@keyframes setToCurrent {

}

@keyframes setToPrevious {

}

current az amelyik a jobb oldalon lesz majd, ezt a képet fogjuk látni, a másik meg a previous, az amelyik majd overflow: hidden-vel el lesz 
takarva és az jön majd be a current helyére a current meg majd el fog tünni jobbra és egy másik kép majd previuos lesz, de azt nem fogjuk látni 
-> 
@keyframes setToCurrent {
    from {left: -100%;}
    to {left: 0;}
}

@keyframes setToPrevious {
    from {left: 0;}
    to {left: 100%;}
}

és akkor ennél nem is kell bonyolultabb, mert ha -100%-on van, akkor pontosan nem fog látszódni!!!!!!!!!!
erre kellenének majd a class-ek de ezt meg tudjuk majd adni style-val is 
-> 
<img style={{left:"-100%"}}src={images[index > 0 ? index-1 : images.length-1]} />

de, hogy majd müködjön ezzel a left-vel, hogy position: absolute-nak kell lennie!!! 
<img style={{left:"-100%", position: "absolute"}}src={images[index > 0 ? index-1 : images.length-1]} />
ez nagyon fontos!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

És akkor fel is ugrott a bal oldalra az a kép, ami eddig alatta volt!!!! 
Ez a lényege, hogy rárakjuk mindegyikre az animációt és position: absolute legyen 
*/