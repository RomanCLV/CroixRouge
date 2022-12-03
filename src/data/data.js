import CityModel from "../models/cityModel";
import ProductModel from "../models/productModel";

import { CATEGORIES, SIZE, GENDER } from "./dataType";
import AccountModel from "../models/accountModel";
import CityReducedModel from "../models/cityReducedModel";

const data = {
    users: [
        new AccountModel({
            id: 1,
            username: "Marie Lemoine",
            email: "marie.lomoine@gmail.com",
            password: "1",
            avatar: "%PUBLIC_URL%/assets/images/avatar1.png"
        }),
        new AccountModel({
            id: 2,
            username: "Jean Sarcelle",
            email: "jean.sarcelle@gmail.com",
            password: "2",
            avatar: "%PUBLIC_URL%/assets/images/avatar2.png"
        }),
        new AccountModel({
            id: 3,
            username: "Cécile Anate",
            email: "cecile.anate@gmail.com",
            password: "3",
            avatar: "%PUBLIC_URL%/assets/images/avatar3.png"
        }),
        new AccountModel({
            id: 4,
            username: "Jean Bouchin",
            email: "jean.bouhchin@gmail.com",
            password: "4",
            avatar: "%PUBLIC_URL%/assets/images/avatar4.png"
        }),
        new AccountModel({
            id: 5,
            username: "Nicolas Ratier",
            email: "nicolas.ratier@gmail.com",
            password: "5",
            avatar: "%PUBLIC_URL%/assets/images/avatar5.png"
        }),
        new AccountModel({
            id: 6,
            username: "Julie Sampaut",
            email: "julie.sampaut@gmail.com",
            password: "6",
            avatar: "%PUBLIC_URL%/assets/images/avatar6.png"
        })
    ],
    cities: [
        new CityModel({
            name: "Bayonne",
            image: "https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcScXy1LZ5BUC0ObCTsMJtfTeWl75Crjoq_fqVjj8eeZL6zzSfoy7GpK2YHTfGFm3eSc"
        }),
        new CityModel({
            name: "Biarritz",
            image: "https://www.biarritz-pays-basque.com/wp-content/uploads/2019/04/Biarritz_Town_4.png"
        }),
        new CityModel({
            name: "Paris",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/1200px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg"
        })
    ],
    products: [
        // region TShirt
        new ProductModel(generateTShirt(
            "Haut chic",
            GENDER.FEMALE,
            5,
            "En coton. Détail en velours sur le col.\n" +
            "Un design très original.\n" +
            "Tricots élastiques adaptables.",
            SIZE.L,
            11.99,
            [
                "https://images1.vinted.net/t/03_02320_PGXy6vuqdqbLjswxswHzWu7L/f800/1670072056.jpeg?s=ee5aad64c2156eacdbe753cdff473f95bc0a3640",
                "https://images1.vinted.net/t/03_01601_ve4vQFp9uebTozhRMwdRKtPQ/f800/1670072056.jpeg?s=8d7821c31b559cf7aa05747c26f00751f21cd97a",
                "https://images1.vinted.net/t/02_00de3_qbXxF1z1xvU2sBAL8UY8a83p/f800/1670072056.jpeg?s=f8428a3aeac709164aac2c00ddc97e125dbd06c2"
            ]
        )),
        new ProductModel(generateTShirt(
            "Jersey",
            GENDER.FEMALE,
            4,
            "Super beau jersey, toucher doux, état neuf usage unique.",
            SIZE.M,
            8,
            [
                "https://images.vinted.net/t/03_00fd7_unZybxyzDvjSikvWycmhgQca/f800/1670071947.jpeg?s=955a1a8ab7cac438b74f1ee986ffa591729d5a97",
                "https://images.vinted.net/t/03_0222f_Puxx6NJDoUcnxZtdjTvgE1vw/f800/1670071947.jpeg?s=e514ae49edf3158b9ec038beeacd8eeb609f8ca7"
            ]
        )),
        new ProductModel(generateTShirt(
            "Pull Sézane Leon bleu",
            GENDER.FEMALE,
            4,
            "Beau pull Leon bleu.\n" +
            "En très bon état.",
            SIZE.S,
            75,
            [
                "https://images1.vinted.net/t/03_0121f_ohiXH2wXfabjFXnvfqR3ziNS/f800/1670071754.jpeg?s=7f18b00c1951cfd2133d6829d2ac7af10c5f975c",
                "https://images1.vinted.net/t/02_01ce5_E5fezJdn4EdGm4iscoTpQbEz/f800/1670071754.jpeg?s=cdf417e818689d4a27cb32284d69fb8dfa12822a",
                "https://images1.vinted.net/t/03_006e9_c9XTujksgvpzuQNofCoiYzj4/f800/1670071754.jpeg?s=58a14e6664021bbde1ecdd7a7fb0b8dd27d1f45b"
            ]
        )),
        new ProductModel(generateTShirt(
            "T-shirt Narcos",
            GENDER.MALE,
            5,
            "Couleur blanche",
            SIZE.S,
            19.99,
            [
                "https://images1.vinted.net/t/01_003ab_o9zfBNnHQsjtS6y2eteBdeZL/f800/1670080773.jpeg?s=3f2f8d6c1857af10037984e8b30563e750e5ed5c",
                "https://images1.vinted.net/t/03_025a4_JTkLkG2NTbhhMojHSpe3LDV7/f800/1670080773.jpeg?s=852705e4c89b535fddcf7685d9a168ff434f755f",
                "https://images1.vinted.net/t/02_0120b_uxuc8pvKAakQAYihRtXiavEQ/f800/1670080773.jpeg?s=bbf0a0cd0875a82518195a9318bba2af04e637c9"
            ]
        )),
        new ProductModel(generateTShirt(
            "T-shirt Goku Dragonball Super",
            GENDER.KID,
            4,
            "Imprimé en très bon état.",
            SIZE.XS,
            2.50,
            [
                "https://images1.vinted.net/t/02_005e5_QP9aPA6f7Be4ub6J5GgvegiK/f800/1670080364.jpeg?s=623b5f9a29286aa47d903cb4425d30446f0137c9",
                "https://images1.vinted.net/t/02_00400_adjr8q4BnRqmrsSwiCpkBJiz/f800/1670080364.jpeg?s=a3032f01c677223eb567e1f7efb3c06713c40a06",
                "https://images1.vinted.net/t/02_01dfb_JRNpU6PrCh4wF7CTGKTJidZD/f800/1670080364.jpeg?s=9109b2332f1eba2fe14b54bc1c62615947c7805c"
            ]
        )),
        new ProductModel(generateTShirt(
            "T-shirt assassinassions Classe Room",
            GENDER.MIX,
            4,
            "Magnifique T-shirt 100% coton, très tendance.\n" +
            "Pour homme ou femme.",
            SIZE.L,
            15,
            [
                "https://images1.vinted.net/t/03_00a71_Se5eYBjhVtHnwqyakRtGNm71/f800/1670073100.jpeg?s=076b921f96886f101f3bc6cf54523ee45ef38d9c",
                "https://images1.vinted.net/t/01_00db5_taiHE8cnKFQYvbRagSsD1XDp/f800/1670073100.jpeg?s=c5c6ec03ce727815dec24a8dd7b27d3aa52ff85b",
                "https://images1.vinted.net/t/02_02364_htcun2gBrTYQaVtf4WZW6dsz/f800/1670073100.jpeg?s=03aea25c6e65ed8db652a7f39ae0b5450df41d43"
            ]
        )),
        // endregion

        // region SWEAT
        new ProductModel(generateSweat(
            "Polaire rose",
            GENDER.FEMALE,
            4,
            "Doublure en polaire rose.",
            SIZE.XXXL,
            18,
            [
                "https://images1.vinted.net/t/03_01785_KTqqqqQz4NvzJbSG2fggC59y/f800/1670072682.jpeg?s=efd1f88756cfe33cea59e5217589b6266798f0a2",
                "https://images1.vinted.net/t/01_0047d_EdHagvFarPQivBB4PuxfZRzd/f800/1670072682.jpeg?s=d13f11a42aaf461994f550ec2c55d8c46b16db57",
                "https://images1.vinted.net/t/03_02035_pZPDQjS7ANreJnfunSMPsrXk/f800/1670072682.jpeg?s=8ff2614310d8b96bec199648ad0a67e2467c96bc"
            ]
        )),
        new ProductModel(generateSweat(
            "Sweat Nike",
            GENDER.MALE,
            5,
            "💫 Sweat Nike bleu marine et vert\n" +
            "✅ Aucun défaut\n" +
            "🚀 Envoi rapide",
            SIZE.M,
            30,
            [
                "https://images1.vinted.net/t/01_0038c_r8zBvWQPpP3DPRQKa3ZJrqwe/f800/1670084638.jpeg?s=31879d3f4e8403d2d527070a8e1ff8087ab7b613",
                "https://images1.vinted.net/t/03_00585_jSzBQqKNoU6eHheaaRz9twkS/f800/1670084638.jpeg?s=22e44176aed5248a43ceaa075f90d34c4574b557",
                "https://images1.vinted.net/t/02_007f5_c2dq5dtpkjvE2MDU4oB5LsHD/f800/1670084638.jpeg?s=859ea7cb499e0b29174313632ebad61b787758b9"
            ]
        )),
        new ProductModel(generateSweat(
            "Sweat bleu Brooklyn",
            GENDER.FEMALE,
            4,
            "Sweat overzise\n" +
            "porté quelques fois",
            SIZE.XS,
            8,
            [
                "https://images1.vinted.net/t/02_01bd8_DLAmfM7LEp7ZtpwwdTMnEs99/f800/1670088313.jpeg?s=a1fe97636750e7c3df2d9e1bbde3323d4c3672f3",
                "https://images1.vinted.net/t/03_01324_yJFgPFsJxXGfGboCgRcSyh31/f800/1670088313.jpeg?s=79d45e7dec06905858e7a6240f67bfa1b7ac6691",
                "https://images1.vinted.net/t/02_024b2_5Ab9nKYgyqhiGuTcQRL1R1MS/f800/1670088313.jpeg?s=132f03a80847a835a6866efd9a7a17d0387057ac"
            ]
        )),
        new ProductModel(generateSweat(
            "Sweat umbro vintage oversize blanc rouge XL",
            GENDER.MALE,
            3,
            "",
            SIZE.XL,
            27,
            [
                "https://images1.vinted.net/t/01_02001_DYDh9qtU2JDf65hTv7jsC4ig/f800/1670094146.jpeg?s=1c1853f36ab4bc4d1aafe57de61fc11ac2cd9f68",
                "https://images1.vinted.net/t/03_011a5_sgpxPWq97c3PardfmbfQuaQw/f800/1670094146.jpeg?s=7754217787f3eb05948a12d62c1bf79a52b49114",
                "https://images1.vinted.net/t/02_022ce_a94giQ5heu2zismvtBLeU6wQ/f800/1670094146.jpeg?s=6fba2cc5fb156c13f799c8499d6538d8aeb2e749"
            ]
        )),
        new ProductModel(generateSweat(
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
                "https://images1.vinted.net/t/02_00f3b_uJsPYLnCdDziPM5j2b1xof1b/f800/1669935056.jpeg?s=9c38021306bf0add7f66f0e035889e73596b4f93",
                "https://images1.vinted.net/t/01_013db_jHmdETVWJsCyPL1qJHKxtGZa/f800/1669935056.jpeg?s=b678922124bcca7abf737edf1e1868184fa34647"
            ]
        )),
        new ProductModel(generateSweat(
            "Pull Levis",
            GENDER.FEMALE,
            5,
            "Pull Levis authentique taille L.",
            SIZE.L,
            23,
            [
                "https://images.vinted.net/t/02_0037c_CTEurjBJKxJjw7nnSyzph4dp/f800/1668695360.jpeg?s=949601ccade5da9d810c3efb389d8082f3f95ed5",
                "https://images.vinted.net/t/01_00fdb_EVpTdZjCY3h9P9Mzumygeqaf/f800/1668695360.jpeg?s=1599409a9e13378eb2065b2ac2eb9fa706d2c31b",
                "https://images.vinted.net/t/03_00368_4rFG9rhUnYyQWo9xTkhtxhVd/f800/1668695360.jpeg?s=2c5edd0ea15167800e9af52ab09252902be55820"
            ]
        )),
        // endregion

        // region PANTS
        new ProductModel(generatePants(
            "Pantalon Skinny Kiabi",
            GENDER.MALE,
            4,
            "Pantalon Skinni Kiabi.\n" +
            "Très bon état, aucun défaut.",
            SIZE.S,
            4,
            [
                "https://images1.vinted.net/t/03_00e3d_rru2kFGzeQpqbkZ6tQovdUEt/f800/1669223774.jpeg?s=43eb9d15c3f41686d16b3f4bcec20513ae5d247a",
                "https://images1.vinted.net/t/03_005aa_zxNTGjwUm7dvoDCwyhEuUCTB/f800/1669223774.jpeg?s=28572c68347e4fbc7f8bfb4eb7a0c17d827d3ea8",
                "https://images1.vinted.net/t/03_00d9d_2NZPE5XiqKFRoJ1CnpTxXS4D/f800/1669223774.jpeg?s=00bd68a7d18d6e00ab86dc6416a81715fc188a72"
            ]
        )),
        new ProductModel(generatePants(
            "Pantalon de ski Wed’ze",
            GENDER.MIX,
            3,
            "Porté quelques fois mais en très bon état.",
            SIZE.XL,
            15,
            [
                "https://images1.vinted.net/t/03_00401_oTqRXeegZK9i9iv3mN7CD7wx/f800/1670085335.jpeg?s=689ee4922e31c2aed749df2c8d7aa4cb18a9330a",
                "https://images1.vinted.net/t/03_024a1_SAS5GZwsVZHZBgxAEX6ZjdN3/f800/1670085336.jpeg?s=6db71dcc5927625dc94b46252d97bc5e69121f63",
                "https://images1.vinted.net/t/03_0150b_VURhA76MAv8t8F5CL5UZmnXV/f800/1670085335.jpeg?s=f3480f67d10854d61d7aef4a63e3dac8d7894e0e"
            ]
        )),
        new ProductModel(generatePants(
            "Jeans Levis",
            GENDER.FEMALE,
            4,
            "W31 L34\n" +
            "Jean Lévis taille haute ",
            SIZE.L,
            45,
            [
                "https://images1.vinted.net/t/02_006d2_Rk9NnRA6PEBQTStNgikzo1ru/f800/1668698069.jpeg?s=d9c534d077cf476bedbdd01879a5140ec8a38189",
                "https://images1.vinted.net/t/01_02331_yqvZwovGNQduuDMuwDL9CdFn/f800/1668698069.jpeg?s=f001156b29af6565c92a8e011be44aa08b13b2b8",
                "https://images1.vinted.net/t/03_01389_F2TpQAaFQRzcgdEWQ2DY7yoA/f800/1668698069.jpeg?s=436fb4c469b2e42e1772fd97e927b04500de75b5"
            ]
        )),
        new ProductModel(generatePants(
            "Jean noir Wragger",
            GENDER.MALE,
            3,
            "État vintage. Coupe baggy / stretch.",
            SIZE.M,
            30,
            [
                "https://images1.vinted.net/t/02_02317_8GQWud4uQsQQFtpD93jFgVsw/f800/1670093221.jpeg?s=8a7fd3c008ae5781fd9b79db62fc163556b957f5",
                "https://images1.vinted.net/t/03_00a2e_nd7aYCALpYMVaQXL1zwoTGRo/f800/1670093221.jpeg?s=a7a1d72f4432b3c40249e9444e859bffd01e2aa0",
                "https://images1.vinted.net/t/02_00d01_gNsEpHuxTbe6hbpcctGBBs53/f800/1670093221.jpeg?s=585e582121ce32c77cdabdf0d78960dbe629e17c"
            ]
        )),
        new ProductModel(generatePants(
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
                "https://images1.vinted.net/t/03_011fd_rgWwy1RSwXwfi8BmGiLKcRyc/f800/1669885959.jpeg?s=5fb2252415a30213ee84e9e6322e80d1546b7259",
                "https://images1.vinted.net/t/02_01947_d9GWZV9w4qD5xoP4VC68bh2V/f800/1669885959.jpeg?s=6a6be0c7a645985ef73b538d01dfe09d7a78d0e0",
                "https://images1.vinted.net/t/03_01c84_cDjNr569v1tisn6apKZwqfdR/f800/1669885959.jpeg?s=3772c42b65b20a7092e05da72d6584b9f6c7760b"
            ]
        )),
        new ProductModel(generatePants(
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
                "https://images1.vinted.net/t/02_014ce_3p2MgAAAfDDayP5tNsJ5d5Va/f800/1669888335.jpeg?s=f3846638b1d0019d16aee49de88f3fe9ca94ec35",
                "https://images1.vinted.net/t/01_00054_bNFRuYKmHKFvo5Kkx8jTadSZ/f800/1669888335.jpeg?s=7cb761e78720ca41dc82ee65a61f77d2b72b617e",
                "https://images1.vinted.net/t/02_0193a_MTAgdfqmwg1qtG1JRiJbMQeP/f800/1669888335.jpeg?s=e642b153cad0e3f4cac3b99b2f244031ea616c1d"
            ]
        )),
        // endregion

        // region JACKET
        new ProductModel(generateJacket(
            "Veste Polaire The North Face Fleece Zippée",
            GENDER.MALE,
            4,
            "Message privé pour plus d’informations sur l’article !",
            SIZE.L,
            59.90,
            [
                "https://images1.vinted.net/t/03_0080b_1PH5j6yNzK7FZGenNbw7ksqa/f800/1669990758.jpeg?s=b2ef6908219d91bf32c2f3369328f7f02ca56622",
                "https://images1.vinted.net/t/01_00444_c1rE97Qk4pEccBfRKDwAhsmA/f800/1669990758.jpeg?s=c952ff9e561250af4b1c3c9e554e87263f74ec68",
                "https://images1.vinted.net/t/03_01e4c_ShQUgAv9htr3CAXcdFQS2x7M/f800/1669990758.jpeg?s=5882f412b96cc3ead67a84f460533644960a3d5e"
            ]
        )),
        new ProductModel(generateJacket(
            "Veste type kimono The kooples",
            GENDER.FEMALE,
            5,
            "Porté 2-3 fois , état impeccable, pas de défaut.\n" +
            "Soie 100%",
            SIZE.M,
            50,
            [
                "https://images1.vinted.net/t/03_006c8_6wbvFGAvmnGLCw5TsVQHgncV/f800/1670062898.jpeg?s=abd9faefbcc735883e0642e57805998cc61db1eb",
                "https://images1.vinted.net/t/01_00e51_9srLRQu5rrb5TBix27mSwNN5/f800/1670062898.jpeg?s=409032b967054f92ce70e5fa30404f081a9fb215",
                "https://images1.vinted.net/t/01_01e63_hywG5yuUQ7PYrfcoawFqLZmR/f800/1670062898.jpeg?s=4e7cd1f75d32dee7440fa358eb74e4a2b4cb3156"
            ]
        )),
        new ProductModel(generateJacket(
            "Blazer Gerry Weber, couleur rose",
            GENDER.FEMALE,
            5,
            "Blazer Gerry Weber, Neuf sans étiquette, modèle coupe cintrée, tissu en coton stretch et fermeture boutonnée, coupe et finition excellentes, couleur rose, Taille XXL.\n" +
            "Epaules : 40cm\n" +
            "Poitrine : 50cm\n" +
            "Longueur totale : 61cm",
            SIZE.XXL,
            16,
            [
                "https://images1.vinted.net/t/01_0059c_otHTzNpDCztr59sqsBPXSgqw/f800/1669887831.jpeg?s=a08332fee4dd306e7e4fadbf9b83a5689075e9da",
                "https://images1.vinted.net/t/03_00cd5_zNu9T31QyzuMGsY91tzZVc6m/f800/1669887831.jpeg?s=0c917e32dc65d40cca514b75c91321b94f198972",
                "https://images1.vinted.net/t/03_01127_J6YELWBRz7KxMcNZFDqCA81Q/f800/1669887831.jpeg?s=2d65b00d109be1d2733c854a7f943529dc689e65"
            ]
        )),
        new ProductModel(generateJacket(
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
                "https://images1.vinted.net/t/02_01ddd_j1PNt1E2gs9yhEN2VcdiKkbZ/f800/1669884160.jpeg?s=e05d258518708b04e53ea31571ba5773d19f4776",
                "https://images1.vinted.net/t/02_02165_9YSiiYRzgjew9uTEEHodmNxd/f800/1669884160.jpeg?s=969af31b2587c0022982129d4c04b916cfda4246",
                "https://images1.vinted.net/t/03_000b9_dDv1YBc21E6ST1eZnoR1EXFy/f800/1669884160.jpeg?s=4b135a966082739ba533a8d3a97ce801f0ea882d"
            ]
        )),
        new ProductModel(generateJacket(
            "Veste tout en taille M",
            GENDER.MALE,
            5,
            "Utilisé une fois pratiquement neuf",
            SIZE.M,
            20,
            [
                "https://images1.vinted.net/t/01_00e45_Wq2MeBTUeRXbRvR4xk4KBdvh/f800/1670058571.jpeg?s=3b73b7fdfc8845f3787447314c6a829f0403cb6e"
            ]
        )),
        new ProductModel(generateJacket(
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
                "https://images1.vinted.net/t/03_001b5_jW8sf2E8GTdzLZXKgwQk7y8E/f800/1665869370.jpeg?s=1dd76e93ff5357b210eef43e73b998c985c26840",
                "https://images1.vinted.net/t/02_00936_Z8okiddMBDmLEbMRTCwgGFG4/f800/1665869370.jpeg?s=6aeaa156b513dd54702682b6c20ee65f2afd47ad",
                "https://images1.vinted.net/t/03_00beb_tHcs5bVUTr85rzBahWJwgx3A/f800/r3/1665869370.jpeg?s=fc32f2db0e6a29ad1cbf142c9f3c68b88a5d5a68"
            ]
        )),
        // endregion

        // region COAT
        new ProductModel(generateCoat(
            "Veste en velours homme",
            GENDER.MALE,
            3,
            "En bon état.\n" +
            "Envoie rapide 📦⚡️",
            SIZE.S,
            13,
            [
                "https://images1.vinted.net/t/03_01793_EQyaaCgU2kwpheeotPFqxMty/f800/1669992459.jpeg?s=8632bf18b874511be28a5e905e1484b3ca622a03",
                "https://images1.vinted.net/t/03_02549_8M1ookKfwXsTwk9r8Wi5BQU2/f800/1669992459.jpeg?s=db1e1075e0c84656108c10ba98eb1be2a8fb001f",
                "https://images1.vinted.net/t/03_00d9f_x4nBe4eRAcW8R3LPsgqWECyA/f800/1669992459.jpeg?s=ba2fff6f077e2d1b876d3511099bc4afb3a2dec0"
            ]
        )),
        new ProductModel(generateCoat(
            "Caban Zara",
            GENDER.FEMALE,
            4,
            "Boutons dorés",
            SIZE.S,
            18,
            [
                "https://images.vinted.net/t/01_01ca4_4dzFnLnbGLsRmYFzZ9R4EvM2/f800/1670066440.jpeg?s=4e2e3654ac057c7c565aa211760f341aebf5e4d0",
                "https://images.vinted.net/t/01_00911_Tt5SZZeStt5g8yCfpgSXy77j/f800/1670066440.jpeg?s=9a1c9b5b3f1c2b7222ba06ca22b7bfb9632f5f3a",
                "https://images.vinted.net/t/01_00303_jnuYdiGtwP7F6uCrCJSGFcHt/f800/1670066440.jpeg?s=976df3f0e1dc7040637904795827fcb248de120b"
            ]
        )),
        new ProductModel(generateCoat(
            "Manteau North Face avec capuche",
            GENDER.MALE,
            4,
            "A vendre veste north face originale, convient à une taille plus grande, en excellent état, " +
            "la fourrure peut s'enlever de la capuche, magnifique, n'a servi que quelques fois car trop grande",
            SIZE.M,
            80,
            [
                "https://images1.vinted.net/t/03_00fb3_btP6efsDqXCF71P1sV3bRPJT/f800/1669898074.jpeg?s=977ee819edf6824073a02dfe0d08e826dee3cc2b",
                "https://images1.vinted.net/t/01_0237d_QkaMKdV57eegpe8DpTt6gsYy/f800/1669898074.jpeg?s=9bb622f92a51e023e0571d29e175a64de096cd87",
                "https://images1.vinted.net/t/01_025a2_iuYkkovdwkWxni9szg3tNUTQ/f800/1669898074.jpeg?s=08ff5cb96bf1b4f1282c8f20ace04d7a1283db05"
            ]
        )),
        new ProductModel(generateCoat(
            "Manteau coupe vent d'occasion",
            GENDER.MALE,
            2,
            "Coupe-vent noir garçon/homme d'occasion." +
            "Il a un zip et des boutons. Le col en fourrure est amovible. Le bas des manches a une bordure en tricot.",
            SIZE.M,
            11,
            [
                "https://images1.vinted.net/t/02_00d57_ty6yZM7pYvXTpgd2RW4qAwTB/f800/1667140716.jpeg?s=ca9fce469ccc8fe0af1f64131533fad5fb9da12c",
                "https://images1.vinted.net/t/02_02418_oiMJXXzFTw1LyFdgXAAxQ5Za/f800/1667140716.jpeg?s=38e51d9201839fce161e032c5b0b094468024eb7",
                "https://images1.vinted.net/t/03_0075f_GxcuCf6HxwPWsgm3m4Cs9c91/f800/1667140716.jpeg?s=dd61f3b7ad17ea3f4b35b9b69bc584ebf5d1171a"
            ]
        )),
        new ProductModel(generateCoat(
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
                "https://images1.vinted.net/t/01_0069b_46gNjVv2pwScQYhYUBhVinZV/f800/1668351744.jpeg?s=a1ce7ab921ca5fefa7a7ee75f72fdba55449297b",
                "https://images1.vinted.net/t/02_01723_9z3NmhMLbFW6ojn3N5sFYdJv/f800/1668351744.jpeg?s=654f9a724f8adaf781b1f22c357f7e77fd946366",
                "https://images1.vinted.net/t/03_01c09_4kCh8Ls7CK86bMDyr8pCUmXF/f800/1668351744.jpeg?s=f0b63d9ba7c3fd661be1c9cd319307440bed0d9d"
            ]
        )),
        new ProductModel(generateCoat(
            "Doudoune noire Oltre",
            GENDER.FEMALE,
            4,
            "Utilisé très peu de fois. Zip intérieur + 2 rangées de boutons pressions.\n" +
            "Le bas de la manche est doublé avec un léger élastique. L'étiquette de taille a été supprimée.\n" +
            "Mesure d'aisselle à aisselle environ 55 cm. Longueur environ 88 cm.",
            SIZE.L,
            25,
            [
                "https://images1.vinted.net/t/03_0117a_1vsyyGJTVrPSTfroCK43Tudv/f800/1667142015.jpeg?s=c35da064f7693f70476165fdca1fc875fa80b2a8",
                "https://images1.vinted.net/t/03_01a63_VNqYwx7Tgc2Az1iK4io9zcS6/f800/1667142015.jpeg?s=b33a36c23536833f4985cdd52e577d75c18704a9",
                "https://images1.vinted.net/t/03_022d0_CMhfSsekmEFdDipCB4qb9w1m/f800/1667142181.jpeg?s=e75276b54f876de0131be0dd759418b2d4081611"
            ]
        ))
        // endregion
    ]
};

// region generate functions

function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
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
    return {
        name: name,
        gender: gender,
        vestingState: vestingState,
        description: description,
        price: price,
        size: size,
        images: images,
        creationDate: generateDate()
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
    getCitiesFull().forEach(city => {
        const pds = getUnreferencedProducts()
        const count = getRandomInt(2 * pds.length, 4 * pds.length + 1);
        let products = [];
        for (let i = 0; i < count; i++) {
            products.push(new ProductModel({
                city: city.id,
                ...pds[i % pds.length]
            }));
        }
        products = products.sort((a, b) => 0.5 - Math.random());
        for (let i = 0; i < products.length; i++) {
            city.productList.addProduct(products[i]);
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

function getUnreferencedProducts() {
    return fetchData().products;
}

function getProducts() {
    let products = [];
    const cities = getCitiesFull();
    for (let i = 0; i < cities.length; i++) {
        for (let j = 0; j < cities[i].productList.length; j++) {
            products.push(cities[i].productList[j]);
        }
    }
    return products;
}

function getCitiesFull() {
    return fetchData().cities;
}

export function getCities() {
    return fetchData().cities.map(city => new CityReducedModel(city));
}

function registerAccount(props) {
    const account = new AccountModel({
        id: getUsers().length,
        username: props.username,
        email: props.email,
        password: props.password,
        avatar: "%PUBLIC_URL%/assets/images/default.png"
    });
    getUsers().push(account);
    return account;
}

export function getUserById(id) {
    return getUsers().find(user => user.id === id);
}

export function getUserByUsername(username) {
    return getUsers().find(user => user.username.toLowerCase() === username.toLowerCase());
}

export function getUserByEmail(email) {
    return getUsers().find(user => user.email.toLowerCase() === email.toLowerCase());
}

export function login(props) {
    return getUsers().find(user => user.email.toLowerCase() === props.email.toLowerCase() && user.password === props.password);
}

export function signIn(props) {
    let match = getUserByUsername(props.username);
    if (match) {
        return null;
    }
    match = getUserByEmail(props.email);
    if (match) {
        return null;
    }
    return registerAccount(props);
}

export function getNameCities() {
    return getCitiesFull().map(x => x.name);
}

export function getCityById(id) {
    return getCitiesFull().find(city => city.id === id);
}

export function getCityByName(cityName) {
    return getCitiesFull().find(city => city.name.toLowerCase() === cityName.toLowerCase());
}

export function getProductsByCity(cityId) {
    const city = getCityById(cityId);
    return city ? city.productList.items : [];
}

export function getProductById(id) {
    return getProducts().find(product => product.id === id)
}

export function search(query) {
    let products = getProductsByCity(query.city);
    if (query.text) {
        const t = query.text.toLowerCase();
        products = products.filter(p => p.name.toLowerCase().contains(t) || p.description.toLowerCase().contains(t));
    }
    if (query.category) {
        products = products.filter(p => query.category.contains(p.category));
    }
    if (query.size) {
        products = products.filter(p => query.size.contains(p.size));
    }
    if (query.gender) {
        products = products.filter(p => query.gender.contains(p.gender));
    }
    if (query.vestingState) {
        products = products.filter(p => p.vestingState >= query.vestingState);
    }
    if (query.minimumPrice) {
        products = products.filter(p => p.price >= query.minimumPrice);
    }
    if (query.maximumPrice) {
        products = products.filter(p => p.price <= query.minimumPrice);
    }
    return products;
}

export function pay(productsIdList) {
    // TODO: remove articles
}

// endregion
