import CityModel from "../models/cityModel";
import ProductModel from "../models/productModel";

import { CATEGORIES, SIZE, GENDER } from "./dataType";
import AccountModel, {getWithoutPassword} from "../models/accountModel";
// test
const data = {
    users: [
        AccountModel({
            username: "1",
            email: "1@gmail.com",
            password: "1",
            avatar: "./assets/images/avatar1.png"
        }),
        AccountModel({
            username: "Marie Lemoine",
            email: "marie.lemoine@gmail.com",
            password: "1",
            avatar: "./assets/images/avatar1.png"
        }),
        AccountModel({
            username: "Jean Sarcelle",
            email: "jean.sarcelle@gmail.com",
            password: "2",
            avatar: "./assets/images/avatar2.png"
        }),
        AccountModel({
            username: "Cécile Anate",
            email: "cecile.anate@gmail.com",
            password: "3",
            avatar: "./assets/images/avatar3.png"
        }),
        AccountModel({
            username: "Jean Bouchin",
            email: "jean.bouhchin@gmail.com",
            password: "4",
            avatar: "./assets/images/avatar4.png"
        }),
        AccountModel({
            username: "Nicolas Ratier",
            email: "nicolas.ratier@gmail.com",
            password: "5",
            avatar: "./assets/images/avatar5.png"
        }),
        AccountModel({
            username: "Julie Sampaut",
            email: "julie.sampaut@gmail.com",
            password: "6",
            avatar: "./assets/images/avatar6.png"
        })
    ],
    cities: [
        CityModel({
            name: "Bayonne",
            address: "58 All. Marines, 64100 Bayonne",
            lat: 43.4405376,
            lng: -1.5859712,
            image: "https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcScXy1LZ5BUC0ObCTsMJtfTeWl75Crjoq_fqVjj8eeZL6zzSfoy7GpK2YHTfGFm3eSc"
        }),
        CityModel({
            name: "Biarritz",
            address: "16 Av. d'Etienne Villa Banuelos, 64200 Biarritz",
            lat: 43.4878009,
            lng: -1.5447587,
            image: "https://www.biarritz-pays-basque.com/wp-content/uploads/2019/04/Biarritz_Town_4.png"
        }),
        CityModel({
            name: "Paris",
            address: "9 Rue Laplace, 75005 Paris",
            lat: 48.8471968,
            lng: 2.3453181,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/1200px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg"
        }),
        CityModel({
            name: "Saint-Jean-de-Luz",
            address: "Pavillon Henry Dunant, All. Perkain, 64500 Saint-Jean-de-Luz",
            lat: 43.3829,
            lng:-1.676,
            image: "https://www.saint-jean-de-luz.com/wp-content/uploads/2021/04/sjdlz-tvmf-24-780x0.jpg"
        }),
        CityModel({
            name: "Bordeaux",
            address: "50 Rue Ferrere, 33000 Bordeaux",
            lat: 44.841225,
            lng: -0.5800364,
            image: "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQYBPdeeQ34uOStqa9VX_5TSfr3634gXIUyVuZh2m6RmzQIqqt3TGWey8rYC1_ECno7"
        }),
        CityModel({
            name: "Marseille",
            address: "64 Rue Clovis Hugues, 13003 Marseille",
            lat: 43.2961743,
            lng: 5.3699525,
            image: "https://geo.img.pmdstatic.net/fit/https.3A.2F.2Fi.2Epmdstatic.2Enet.2Fgeo.2F2022.2F09.2F02.2F5bfb6118-5e3b-4b15-b8a0-c232faaece83.2Ejpeg/1200x630/cr/wqkgTW9uc2lldXIgRnJhbmNrIC8gNTAwcHggLyBHRU8%3D/visiter-marseille-et-ses-alentours-sans-voiture-nos-itineraires-accessibles-a-pied-a-velo-ou-en-bateau.jpg"
        }),
        CityModel({
            name: "Lyon",
            address: "28 Rue Montgolfier, 69006 Lyon",
            lat: 45.7578137,
            lng: 4.8320114,
            image: "https://images.ctfassets.net/bth3mlrehms2/3FT2t7eUwluY8vEHRcQcBt/737ba261438c62dcc2bfc873d93690ed/France_Lyon_Quais_de_Sao__ne.jpg?w=2119&h=1414&fl=progressive&q=50&fm=jpg"
        }),
        CityModel({
            name: "La Rochelle",
            address: "Ilot Joffre, Rue Franc Lapeyre, 17000 La Rochelle",
            lat: 46.1591126,
            lng: -1.1520434,
            image: "https://media.routard.com/image/44/6/la-rochelle.1554446.jpg"
        }),
        CityModel({
            name: "Rennes",
            address: "4 Rue du Bois Perrin, 35700 Rennes",
            lat: 48.1113387,
            lng: -1.6800198,
            image: "https://noscurieuxvoyageurs.com/wp-content/uploads/2020/09/DSF2847.jpg"
        }),
        CityModel({
            name: "Brest",
            address: "460 Rue Jurien de la Gravière, 29200 Brest",
            lat: 48.3905283,
            lng: -4.4860088,
            image: "https://www.bretagne.com/sites/default/files/post/Chateau%20Brest_2.jpg"
        }),
        CityModel({
            name: "Le Havre",
            address: "115 Av. René Coty, 76600 Le Havre",
            lat: 49.4938975,
            lng: 0.1079732,
            image: "https://en.normandie-tourisme.fr/wp-content/uploads/sites/3/2020/04/le-havre-promenade-de-nuit-herve-sentucq.jpg"
        }),
        CityModel({
            name: "Lille",
            address: "10-12 Pl. Guy de Dampierre, 59000 Lille",
            lat: 50.6365654,
            lng: 3.0635282,
            image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Lille_vue_gd_place.JPG"
        }),
        CityModel({
            name: "Strasbourg",
            address: "30 Rue Schweighaeuser, 67000 Strasbourg",
            lat: 48.584614,
            lng: 7.7507127,
            image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Strasbourg_vue_a%C3%A9rienne_vers_la_cath%C3%A9drale_septembre_2015.jpg"
        }),
        CityModel({
            name: "Clermont-Ferrand",
            address: "21 Rue Jean Richepin, 63000 Clermont-Ferrand",
            lat: 45.7774551,
            lng: 3.0819427,
            image: "https://uil.unesco.org/sites/default/files/clermont-ferrand_france_angelus_yodason_flickr.jpg"
        }),
        CityModel({
            name: "Nantes",
            address: "2 Bis Pl. Catinat, 44100 Nantes",
            lat: 47.2186371,
            lng: -1.5541362,
            image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/f7/3a/nantes.jpg?w=700&h=500&s=1"
        }),
        CityModel({
            name: "Toulouse",
            address: "11 Rue Temponières, 31000 Toulouse",
            lat: 43.6015518,
            lng: 1.4430977,
            image: "https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/incontournable_hp/public/thumbnails/image/incontournables_toulouse.jpg?itok=ev-M4trx"
        })
    ],
    defaultProducts: [
        // region TShirt
        ProductModel(generateTShirt(
            "Jersey",
            GENDER.FEMALE,
            4,
            "Super beau jersey, toucher doux, état neuf usage unique.",
            SIZE.M,
            8,
            [
                "https://images1.vinted.net/t/03_021f4_vGUkNADv8mNmxhiCXqeWf2ea/f800/1713014180.jpeg?s=e44407df70d3960edd24b733d50b31453fc3fcff",
                "https://images1.vinted.net/t/02_0110a_bZabPSjLLKZC94CHxdaQbKFw/f800/1713014180.jpeg?s=b8e7ca4b01767d12b52e889ed7ec71c6b9371041"
            ]
        )),
        ProductModel(generateTShirt(
            "Tee Shirt Naf Naf",
            GENDER.FEMALE,
            5,
            "Tee Shirt d’été très léger \n" +
            "Naf Naf \n" +
            "Taille S",
            SIZE.S,
            5,
            [
                "https://images1.vinted.net/t/03_019eb_yUUSAHbMCz48DK4wV9wnqWoc/f800/1713201811.jpeg?s=68538650aa9a68fb32fc87aae9ff0487f77757a5",
            ]
        )),
        ProductModel(generateTShirt(
            "Pull Sézane Leon bleu",
            GENDER.FEMALE,
            4,
            "Beau pull Leon bleu.\n" +
            "En très bon état.",
            SIZE.S,
            75,
            [
                "https://images1.vinted.net/t/01_0007e_wjpvCG25eiRQ2NBYroKbQzfe/f800/1712054545.jpeg?s=a1daef82a6d00ba5e6f41ae985707243bf77ba66",
                "https://images1.vinted.net/t/03_01e75_QD3qjjhJpyFfz54ardxznAgy/f800/1712054545.jpeg?s=3ef0546d835971d30e4cf875251d6e8bd38df8a4",
            ]
        )),
        ProductModel(generateTShirt(
            "T-shirt Narcos",
            GENDER.MALE,
            5,
            "Couleur Noir",
            SIZE.S,
            19.99,
            [
                "https://images1.vinted.net/t/03_01dac_QmysxKrNyoW5fmWn1dfLwiJE/f800/1692545386.jpeg?s=f190488567b476a9e00f05c6d25bd022918111cd",
            ]
        )),
        ProductModel(generateTShirt(
            "T-shirt Goku Dragonball Super",
            GENDER.KID,
            4,
            "Imprimé en très bon état.",
            SIZE.XS,
            2.50,
            [
                "https://images1.vinted.net/t/03_0161a_Pv9RU3xf7eLyM28pqwY2VHx6/f800/1707561168.jpeg?s=e728054fe3d622f00b581cfa40265df8335f05c5",
            ]
        )),
        ProductModel(generateTShirt(
            "T-shirt assassinassions Classe Room",
            GENDER.MIX,
            4,
            "Magnifique T-shirt 100% coton, très tendance.\n" +
            "Pour homme ou femme.",
            SIZE.L,
            15,
            [
                "https://images1.vinted.net/t/02_013f9_AS1zCFcRgRvZCFXgiUCkQbPs/f800/1712591182.jpeg?s=a72f2e50b95dac43476a441a04bba778dc28a87e",
                "https://images1.vinted.net/t/03_01207_VLL3e7AUPk8U6dqUZmx3hezQ/f800/1712591182.jpeg?s=e535332e96159b1f34560af2c30c73b526f87de6",
            ]
        )),
        // endregion

        // region SWEAT
        ProductModel(generateSweat(
            "Polaire rose",
            GENDER.FEMALE,
            4,
            "Doublure en polaire rose.",
            SIZE.XXXL,
            18,
            [
                "https://images1.vinted.net/t/01_0104e_YDqC1icXRFaR6w5yyNVUiq8S/f800/1713098961.webp?s=eaf6145f26fef1cd1eeda268874d7efd15828c4e"
            ]
        )),
        ProductModel(generateSweat(
            "Sweat Nike",
            GENDER.MALE,
            5,
            "💫 Sweat Nike bleu marine et vert\n" +
            "✅ Aucun défaut\n" +
            "🚀 Envoi rapide",
            SIZE.M,
            30,
            [
                "https://images1.vinted.net/t/03_01258_jRjkGGSUryju9PmvkY4U8DkC/f800/1713255524.webp?s=97d2c0926d5ab5babf523eb176a1b3e98dc3ea2c"
            ]
        )),
        ProductModel(generateSweat(
            "Sweat bleu Brooklyn",
            GENDER.FEMALE,
            4,
            "Sweat overzise\n" +
            "porté quelques fois",
            SIZE.XS,
            8,
            [
                "https://images1.vinted.net/t/01_01879_E38pynkwWEpq1n8VwRBskZX3/f800/1708429292.webp?s=f3ef86fbb096e1c1b09bb05b5f4cb43d95db29e2"
            ]
        )),
        ProductModel(generateSweat(
            "Sweat umbro vintage oversize blanc rouge XL",
            GENDER.MALE,
            3,
            "",
            SIZE.XL,
            27,
            [
                "https://images1.vinted.net/t/03_00685_PpQX1AJ8kJctaicaddvgMWGs/f800/1705069282.webp?s=84c856c351d263e111cbe4114d5d7b55aa024e32"
            ]
        )),
        ProductModel(generateSweat(
            "Pull Nike",
            GENDER.MALE,
            2,
            "Pull Nike\n" +
            "Col rond\n" +
            "Chaud & confortable\n" +
            "Petite accro sur le pull",
            SIZE.XXL,
            25,
            [
                "https://images1.vinted.net/t/01_00574_DR2mMFAp3DQ11weS3z59kstS/f800/1713110136.webp?s=356eaf9d23db5b721131ba272a0cf76068fe4aec"
            ]
        )),
        ProductModel(generateSweat(
            "Pull Levis",
            GENDER.FEMALE,
            5,
            "Pull Levis authentique taille L.",
            SIZE.L,
            23,
            [
                "https://images1.vinted.net/t/01_004c2_kXvHRkVobuCU8hcCx1ZQqj8u/f800/1712959450.webp?s=a13d39c9a6f0ec02a1d9417e0a6f7465b4437ccf"
            ]
        )),
        // endregion

        // region PANTS
        ProductModel(generatePants(
            "Pantalon Skinny Kiabi",
            GENDER.MALE,
            4,
            "Pantalon Skinni Kiabi.\n" +
            "Très bon état, aucun défaut.",
            SIZE.S,
            4,
            [
                "https://static.kiabi.com/images/jean-skinny-stretch---l32-stone-used-zj408_4_frb2.jpg",
                "https://static.kiabi.com/images/jean-skinny-stretch---l32-stone-used-zj408_4_frb3.jpg",
                "https://static.kiabi.com/images/jean-skinny-stretch---l32-stone-used-zj408_4_frb1.jpg"
            ]
        )),
        ProductModel(generatePants(
            "Pantalon de ski Wed’ze",
            GENDER.MIX,
            3,
            "Porté quelques fois mais en très bon état.",
            SIZE.XL,
            15,
            [
                "https://contents.mediadecathlon.com/p2413048/k$67179954b41f9994d1bd5fffe5ede89d/sq/pantalon-de-ski-chaud-homme-180-noir.jpg?format=auto&f=1800x1800",
                "https://contents.mediadecathlon.com/p2413045/k$b7926901c756216d2614165347ee3f74/sq/pantalon-de-ski-chaud-homme-180-noir.jpg?format=auto&f=1800x1800",
                "https://contents.mediadecathlon.com/p2413046/k$820c63e9dcf612adcb12c022e4b2eb61/sq/pantalon-de-ski-chaud-homme-180-noir.jpg?format=auto&f=1800x1800"
            ]
        )),
        ProductModel(generatePants(
            "Jeans Levis",
            GENDER.FEMALE,
            4,
            "W31 L34\n" +
            "Jean Lévis taille haute ",
            SIZE.L,
            45,
            [
                "https://images1.vinted.net/t/01_01752_9YCVGjhgQ8XWEDBHu98FdixB/f800/1713248645.jpeg?s=32ba184f639ae662d3cd6e00d562327d4530c188",
                "https://images1.vinted.net/t/01_00008_iXnY9wvRd2zYBEdzVzLWUh84/f800/1713248645.jpeg?s=011b39beea872601ab9d146901fb8f14dc5115ef",
                "https://images1.vinted.net/t/03_00787_r8S4Bk4V13NXsEf9kiVTUZEM/f800/1713248645.jpeg?s=fccb20437d8d4fb50821bedb7fffd9df3c90deeb"
            ]
        )),
        ProductModel(generatePants(
            "Jean noir Wragger",
            GENDER.MALE,
            3,
            "État vintage. Coupe EXTRAAAAA GELAR / stretch.",
            SIZE.M,
            30,
            [
                "https://images1.vinted.net/t/01_00628_fsuA1B1Lyq3BLhSLRtBv7dDF/f800/1713083247.jpeg?s=6fb1025a8d2898a8d2eef1440c53b0893f5e68f4",
                "https://images1.vinted.net/t/01_000cf_43esjh28ftnLQu5s3Z1FMncw/f800/1713083247.jpeg?s=1f0550e28dcc2bdb2a3222e69e941e2013204aff",
                "https://images1.vinted.net/t/03_00150_JnM9QWPJ9AySeTuqJWneq6P7/f800/1713083247.jpeg?s=44b882bdb4cb49a09a7e5d97e3a4420395a7f244"
            ]
        )),
        ProductModel(generatePants(
            "Jean Meltin Pot",
            GENDER.MALE,
            5,
            "Jeans pour homme Meltin Pot, modèle coupe régulière, tissu 100% coton, fermeture à boutons, logo de la marque à l'avant et à l'arrière, excellent ajustement et finition, lavage foncé, en parfait état, taille W33 L34.\n" +
            "Tour de taille : 42cm\n" +
            "Hanches : 49cm\n" +
            "Cheval : 24cm\n" +
            "Longueur totale : 92cm",
            SIZE.M,
            15,
            [
                "https://images1.vinted.net/t/01_0198e_aDAJEzNni97H1aeiK5VT6mLD/f800/1693136377.jpeg?s=542dec80753b31a668cb3e3c0d1e67857320fe1f",
                "https://images1.vinted.net/t/03_015fa_rVdKQDNnSVDFxQr3HqtnXYjU/f800/1693136377.jpeg?s=982c6e7f0c730e182b7d96e9c205e7e1f4636a49",
                "https://images1.vinted.net/t/01_00262_WDGhrwqzc2w3A7q5hzddYeXz/f800/1693136377.jpeg?s=74fdb83d50371c22605aea0a456c81ed58d4d8b2"
            ]
        )),
        ProductModel(generatePants(
            "Pantalon Rinascimento",
            GENDER.FEMALE,
            5,
            "Pantalon Rinascimento, modèle taille haute, tissu à motif rayures verticales, fermeture zippée, coupe et finition excellentes, couleur bleu et rouge, en parfait état, taille XL.\n" +
            "Tour de taille : 39cm\n" +
            "Hanches : 49cm\n" +
            "Cheval : 32cm\n" +
            "Longueur totale : 97cm",
            SIZE.XL,
            12,
            [
                "https://images1.vinted.net/t/02_01aa0_gjVo7k3P73Kr3JLw3p1h7yKr/f800/1704705397.jpeg?s=f8c72978f70c249b1794a018c337ed795f8046eb",
                "https://images1.vinted.net/t/01_00774_doN1evhXucAr1a5h3U6418vC/f800/1704705397.jpeg?s=de79fd34ed07d0df8e86ed10fb4222d4da2a9a2f",
                "https://images1.vinted.net/t/01_01967_bzmBVtHuAiWDLHT9T8GZETAm/f800/1704705397.jpeg?s=af22e4b1252b96eb8dd55e7025e56bebd5fd34f1"
            ]
        )),
        // endregion

        // region JACKET
        ProductModel(generateJacket(
            "Veste Polaire The North Face Fleece Zippée",
            GENDER.MALE,
            4,
            "Message privé pour plus d’informations sur l’article !",
            SIZE.L,
            59.90,
            [
                "https://images1.vinted.net/t/01_00d20_etuexS8JDRqhT1yQmDyJtgMg/f800/1711734349.jpeg?s=0ce7e23db5fbfec60deb0dbe178f49b10eea2b9d",
            ]
        )),
        ProductModel(generateJacket(
            "Veste type kimono The kooples",
            GENDER.FEMALE,
            5,
            "Porté 2-3 fois , état impeccable, pas de défaut.\n" +
            "Soie 100%",
            SIZE.M,
            50,
            [
                "https://images1.vinted.net/t/03_0165b_xGfw1RqmoGAQQTsso7b5NKhA/f800/1697896827.jpeg?s=39eee90a83f3e2c7e6071fd00bfa28366e682714",
                "https://images1.vinted.net/t/01_0213a_sVAYBm8g4kbH4ybF6NmsgmqG/f800/1697896827.jpeg?s=ad45577f4844a88d738271a20d0e862389a19a9d"
            ]
        )),
        ProductModel(generateJacket(
            "Blazer Gerry Weber, couleur rose",
            GENDER.FEMALE,
            5,
            "Porté par Pierre PORTET\n" +
            "Epaules : 40cm\n" +
            "Poitrine : 50cm\n" +
            "Longueur totale : 61cm",
            SIZE.XXL,
            1000.99,
            [
                "https://images1.vinted.net/t/03_01d4c_z3mDvBbkBL4gM1BNWcmzsGAT/f800/1704648245.jpeg?s=37dfdc8efda12d2142ee84f115e692d3b2708a67",
            ]
        )),
        ProductModel(generateJacket(
            "Veste Mango",
            GENDER.FEMALE,
            4,
            "Veste Mango, modèle long et ouvert, tissu en coton mélangé et ceinture en tissu assortie, grandes poches sur le devant, coupe et finition excellentes, couleur beige, en parfait état, taille L.\n" +
            "Epaules : 40cm\n" +
            "Poitrine : 55cm\n" +
            "Longueur totale : 73cm",
            SIZE.L,
            14,
            [
                "https://images1.vinted.net/t/01_01392_pp3kHEMig5sLQ4gGq8a8W4TV/f800/1713080069.jpeg?s=9205e1e2661f3b6176adde528adb946f0fd72e66",
            ]
        )),
        ProductModel(generateJacket(
            "Veste tout en taille M",
            GENDER.MALE,
            5,
            "Utilisé une fois pratiquement neuf",
            SIZE.M,
            20,
            [
                "https://images1.vinted.net/t/01_01356_GG31kXj43mf2QdcC8yNWvg8E/f800/1712700415.jpeg?s=1fb1bf1a3d301b37efeaa393ae425faf3e0fd9a0"
            ]
        )),
        ProductModel(generateJacket(
            "Veste d'entraînement Adidas Climawarm",
            GENDER.MALE,
            4,
            "Veste zippée Adidas Climawarm, coup-vent, en très bon état.\n" +
            "Poches zippées.\n" +
            "Tissu extérieur 100% polyester\n" +
            "Poids +- 480 grammes.",
            SIZE.M,
            20,
            [
                "https://images1.vinted.net/t/01_00093_pJQq9vWG23JuqnJr6wfRfsBB/f800/1665145362.jpeg?s=98375700bbe036882ea068d798d43ce597d9ec58",
            ]
        )),
        // endregion

        // region COAT
        ProductModel(generateCoat(
            "Veste en velours homme",
            GENDER.MALE,
            3,
            "En bon état.\n" +
            "Envoie rapide 📦⚡️",
            SIZE.S,
            13,
            [
                "https://images1.vinted.net/t/01_02515_gWD65DuSCe6gfPJnk14iy2HN/f800/1702384519.jpeg?s=4d9c30fb8c238152f3c63a7519e7488f8ca8316f",
                "https://images1.vinted.net/t/01_00d0d_cyWt2UNf1amgesDUbaUztNzR/f800/1702384519.jpeg?s=4ad582d1185acc3171cccf448b64c2de8e47b3c3",
                "https://images1.vinted.net/t/02_0182f_CwnxM1dmUi84sz4WYuiNJx2Y/f800/1702384519.jpeg?s=8f17b5492cc1a319c17fd9a202c6cde52da6acfa"
            ]
        )),
        ProductModel(generateCoat(
            "Caban Zara",
            GENDER.FEMALE,
            4,
            "Boutons dorés",
            SIZE.S,
            18,
            [
                "https://images1.vinted.net/t/01_00d89_orvFpxFfNNAtKUwBHEUEBMTA/f800/1680520391.jpeg?s=14cb1e64947713ecbfbeab23852330afecefc8d3",
                "https://images1.vinted.net/t/02_01e90_sPhZtvHqfqH9aG4PYT8KnEZs/f800/1680520391.jpeg?s=dadd1fd00bc8efa800eb28972756159a361ef5e6",
                "https://images1.vinted.net/t/02_00ccc_tDqVFbB3czVFCLp8KLuBM17F/f800/1680520391.jpeg?s=8ffc2f1b710795d8d5d244176085fedb3310f32e"
            ]
        )),
        ProductModel(generateCoat(
            "Manteau North Face avec capuche",
            GENDER.MALE,
            4,
            "A vendre veste north face originale, convient à une taille plus grande, en excellent état, " +
            "la fourrure peut s'enlever de la capuche, magnifique, n'a servi que quelques fois car trop grande",
            SIZE.M,
            80,
            [
                "https://images1.vinted.net/t/02_021ed_cqyodpBXX3XN4SMANTfFbX3R/f800/1711812102.jpeg?s=63a35fca7672817d0b777e76258891bcdd45d3f7",
                "https://images1.vinted.net/t/02_014f8_Jq2K5ThTPjvdPXr5XeqTZWV5/f800/1711812102.jpeg?s=3053409bf9c41ed4181b2c2f55e6d13a96bf449e",
                "https://images1.vinted.net/t/01_01a26_YWU76LRi8w8yUFJvom3KgaYK/f800/1711812102.jpeg?s=175c87dd33a69415e5899968fa057bb24b939f7a"
            ]
        )),
        ProductModel(generateCoat(
            "Manteau coupe vent d'occasion",
            GENDER.MALE,
            2,
            "Coupe-vent noir garçon/homme d'occasion." +
            "Il a un zip et des boutons. Le col en fourrure est amovible. Le bas des manches a une bordure en tricot.",
            SIZE.M,
            11,
            [
                "https://images1.vinted.net/t/03_0063a_ySxjSMgTkU86D7yFZEay9WuN/f800/1701075939.webp?s=ffd95a24807219ae38de6a95f93de1b58a4190f0"
            ]
        )),
        ProductModel(generateCoat(
            "Doudoune rouge Club Des Sports Femme",
            GENDER.FEMALE,
            4,
            "Rembourrage en duvet d'oie\n" +
            "2 poches extérieures avec fermeture éclair et 2 poches intérieures\n" +
            "Boutons pression avec logo\n" +
            "Collier avec version double\n" +
            "Col rembourré\n" +
            "Excellent état, utilisé très peu de fois, sans dommage ni signe d'usure, aseptisé et scellé.\n" +
            "Vendu pour cause de manque d'utilisation dû à un achat de mauvaise taille.",
            SIZE.S,
            80,
            [
                "https://images1.vinted.net/t/01_026fb_9mFZvzAeD56AXuXWP6MsbiDQ/f800/1708676447.webp?s=746b6ab7a6754a9eec942cdad36cb09fa2426c91"
            ]
        )),
        ProductModel(generateCoat(
            "Doudoune noire Oltre",
            GENDER.FEMALE,
            4,
            "Utilisé très peu de fois. Zip intérieur + 2 rangées de boutons pressions.\n" +
            "Le bas de la manche est doublé avec un léger élastique. L'étiquette de taille a été supprimée.\n" +
            "Mesure d'aisselle à aisselle environ 55 cm. Longueur environ 88 cm.",
            SIZE.L,
            25,
            [
                "https://images1.vinted.net/t/01_022ce_rFEcMbZakb2fqjPuSuWNLEML/f800/1674150847.webp?s=e47f1116c8b672926c2c2691c8ca1366c37eb4e9"
            ]
        ))
        // endregion
    ],
    products: []
};

// region generate functions

function getRandomInt(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

function generateDate() {
    const today = new Date();
    return new Date(
        today.getFullYear(),
        getRandomInt(0, today.getMonth() + 1),
        getRandomInt(1, today.getDate() + 1)
    );
}

function generateProduct(name, gender, vestingState, description, size, price, images) {
    const creationDate = generateDate();
    return {
        name: name,
        gender: gender,
        vestingState: vestingState,
        description: description,
        price: price,
        size: size,
        images: images,
        creationDateYear: creationDate.getFullYear(),
        creationDateMonth: creationDate.getMonth(),
        creationDateDay: creationDate.getDay()
    };
}

function generateTShirt(name, gender, vestingState, description, size, price, images) {
    return {
        category: CATEGORIES.TSHIRT,
        ...generateProduct(name, gender, vestingState, description, size, price, images)
    };
}

function generateSweat(name, gender, vestingState, description, size, price, images) {
    return {
        category: CATEGORIES.SWEAT,
        ...generateProduct(name, gender, vestingState, description, size, price, images)
    };
}

function generatePants(name, gender, vestingState, description, size, price, images) {
    return {
        category: CATEGORIES.PANTS,
        ...generateProduct(name, gender, vestingState, description, size, price, images)
    };
}

function generateJacket(name, gender, vestingState, description, size, price, images) {
    return {
        category: CATEGORIES.JACKET,
        ...generateProduct(name, gender, vestingState, description, size, price, images)
    };
}

function generateCoat(name, gender, vestingState, description, size, price, images) {
    return {
        category: CATEGORIES.COAT,
        ...generateProduct(name, gender, vestingState, description, size, price, images)
    };
}

export function generateData() {
    const defaultProducts = getDefaultProducts();
    getCities().forEach(city => {
        const ids = [];
        const count = getRandomInt(2 * defaultProducts.length, 4 * defaultProducts.length + 1);
        for (let i = 0; i < count; i++) {
            const product = ProductModel({
                ...defaultProducts[i % defaultProducts.length /*getRandomInt(0, defaultProducts.length)*/],
                cityId: city.id,
            });
            data.products.push(product);
            ids.push(product.id);
        }
        // shuffle products
        const shuffled = ids
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
        for (const id of shuffled) {
            city.products.push(id);
        }
    });
}
// endregion

// region requests

function fetchData() {
    return data;
}

function getUsers() {
    return fetchData().users;
}

function getDefaultProducts() {
    return fetchData().defaultProducts;
}

function getProducts() {
    return fetchData().products;
}
export function getCities() {
    return fetchData().cities;
}

function registerAccount(props) {
    const account = AccountModel({
        username: props.username,
        email: props.email,
        password: props.password,
        avatar: "./assets/images/default.png"
    });
    getUsers().push(account);
    return account;
}

export function getUserByUsername(username) {
    return getUsers().find(user => user.username.toLowerCase() === username.toLowerCase());
}

export function getUserByEmail(email) {
    return getUsers().find(user => user.email.toLowerCase() === email.toLowerCase());
}

export function login(props) {
    const username = props.username;
    const password = props.password;

    let user = getUserByEmail(username);
    if (!user) {
        user = getUserByUsername(username);
    }
    if (user) {
        user = user.password === password ? getWithoutPassword(user) : null;
    }
    if (!user) {
        user = { error: "Identifiants incorrects." }
    }
    return user;
}

export function signIn(props) {
    let match = getUserByUsername(props.username);
    if (match) {
        return { error: "Ce nom d'utilisateur est déjà utilisé." };
    }
    match = getUserByEmail(props.email);
    if (match) {
        return { error: "Cette adresse email est déjà utilisée." };
    }
    registerAccount(props);
    return { success: true };
}

export function getNameCities() {
    return getCities().map(x => x.name);
}

export function getCityById(id) {
    return getCities().find(city => city.id === id);
}

export function getCityByName(cityName) {
    return getCities().find(city => city.name.toLowerCase() === cityName.toLowerCase());
}

export function getProductsByCityId(cityId) {
    const city = getCityById(cityId);
    return city ? city.products : [];
}

export function getProductById(id) {
    return getProducts().find(product => product.id === id)
}

export function searchProducts(cityId, query) {
    let products = getProductsByCityId(cityId);
    if (query.text) {
        const t = query.text.toLowerCase();
        products = products.filter(id =>
            getProductById(id).name.toLowerCase().includes(t) ||
            getProductById(id).description.toLowerCase().includes(t));
    }
    if (query.categories && query.categories.length > 0) {
        products = products.filter(id => query.categories.includes(getProductById(id).category));
    }
    if (query.sizes && query.sizes.length > 0) {
        products = products.filter(id => query.sizes.includes(getProductById(id).size));
    }
    if (query.genders && query.genders.length > 0) {
        products = products.filter(id => query.genders.includes(getProductById(id).gender));
    }
    if (query.vestingState && query.vestingState > 1) {
        products = products.filter(id => getProductById(id).vestingState >= query.vestingState);
    }
    if (query.minimumPrice && query.minimumPrice !== 0) {
        products = products.filter(id => getProductById(id).price >= query.minimumPrice);
    }
    if (query.maximumPrice && query.maximumPrice !== 10000) {
        products = products.filter(id => getProductById(id).price <= query.maximumPrice);
    }
    return products;
}

export function pay(productsIdList) {
    if (productsIdList.length === 0) {
        return { error: "Aucun produit à payer." };
    }
    // data.products = data.products.filter(product => !productsIdList.includes(product.id));
    const cityId = getProductById(productsIdList[0]).cityId;
    const city = getCityById(cityId);
    const newProducts = [];
    while (city.products.length > 0) {
        const id = city.products.shift();
        if (!productsIdList.includes(id)) {
            newProducts.push(id);
        }
    }
    for (const id of newProducts) {
        city.products.push(id);
    }
    return { success: true };
}

// endregion
