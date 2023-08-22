<template>
    <el-container>
        <el-aside width="256px" style="position: relative;">
            <el-button type="primary" style="position: absolute;right: 4px;top: 4px;z-index: 10;">新建接口</el-button>
            <el-table :data="apis" :row-class-name="tableRowClassName" @row-click="selectAPI">
                <el-table-column prop="details.method" label="方法" width="84" />
                <el-table-column prop="details.summary" label="简介" width="172" />
            </el-table>
        </el-aside>
        <el-main>你好</el-main>
    </el-container>
</template>
<script lang="ts" setup>
import { useStore } from 'vuex'
import { computed } from 'vue';
import { APItem } from '../../types/apis';
import { storeMutation } from '../../constant/store';
const apis = [
    {
        "aid": 86,
        "details": {
            "path": "dolore in cupidatat",
            "summary": "cillum labore",
            "parameters": [
                {
                    "name": "被然白指多",
                    "in": "laboris ut aute mollit sed",
                    "description": "积安近必头每有群口什委准任立张质省江。效管设还长过团党周展达员府满连以。或前指土如转素些已单才府约热间。力养基程王段片住调地照员只些金持叫。方更确面写状部无效到住京看。什关人数南始建干写斗易置研期叫书。",
                    "required": false,
                    "schema": {
                        "type": "ipsum ullamco anim exercitation"
                    }
                },
                {
                    "name": "科此需把",
                    "in": "commodo",
                    "description": "之还常斯原速斯内或角千五际。群六加维度后快传先准名省热什出。养从近结后声石理听属林件出分为才。",
                    "required": true,
                    "schema": {
                        "type": "fugiat eu amet"
                    }
                },
                {
                    "name": "已其飞术保算",
                    "in": "elit magna aliqua eiusmod sed",
                    "description": "开强有段次清使如利公已般信。过料准精三院率物省美参论量马决。水日程史光导起常压根还得决回干并号。中个据美看立公时便道方再平基线较。能果发成积清存它直先龙无料向具果。合与术什切带完自格党线易集拉儿。",
                    "required": true,
                    "schema": {
                        "type": "exercitation quis voluptate sed"
                    }
                }
            ],
            "method": "GET",
            "responses": [
                {
                    "code": 7,
                    "description": "积必行主农列资算会和周中北。光海然学次阶状知低达就斯议动。出几中装最线业委即加开中话可走院。来正集算际队满出我持华思值解们研。门没素收矿性比为条局应如它。",
                    "content": [
                        {
                            "MIME": "Duis adipisicing pariatur",
                            "schema": "velit dolor exercitation"
                        },
                        {
                            "MIME": "culpa reprehenderit Ut cupidatat",
                            "schema": "quis sint"
                        },
                        {
                            "MIME": "mollit irure Lorem eiusmod",
                            "schema": "amet quis"
                        },
                        {
                            "MIME": "exercitation labore sint ut ut",
                            "schema": "sit elit occaecat deserunt Duis"
                        },
                        {
                            "MIME": "voluptate aliquip incididunt in",
                            "schema": "culpa ipsum Lorem tempor do"
                        }
                    ]
                },
                {
                    "code": 96,
                    "description": "流劳形周便人易精历育江厂般连热。率下信风料据她通品几很即山传约新。支有层际题快间东究属实照问斯林平。",
                    "content": [
                        {
                            "MIME": "elit",
                            "schema": "ex deserunt sunt nostrud"
                        },
                        {
                            "MIME": "qui",
                            "schema": "qui officia do tempor dolore"
                        },
                        {
                            "MIME": "enim mollit quis in veniam",
                            "schema": "elit sit cillum aliqua voluptate"
                        },
                        {
                            "MIME": "esse fugiat",
                            "schema": "minim eiusmod in id"
                        },
                        {
                            "MIME": "pariatur fugiat est esse",
                            "schema": "cillum deserunt labore voluptate fugiat"
                        }
                    ]
                },
                {
                    "code": 85,
                    "description": "马数进可总儿听验农积即变结。次他高新代展保速单心正之龙次矿。文矿无动命运入平长可构为。各去传府也着习光步部会收听式矿联。律老者和问它十论心华西争但意。心它养院第发步采响求最毛近例。",
                    "content": [
                        {
                            "MIME": "officia pariatur velit",
                            "schema": "velit"
                        },
                        {
                            "MIME": "ut incididunt consequat",
                            "schema": "cillum"
                        },
                        {
                            "MIME": "non aliqua laborum dolore",
                            "schema": "cillum"
                        },
                        {
                            "MIME": "aute non consectetur ex",
                            "schema": "in nostrud officia eu enim"
                        },
                        {
                            "MIME": "est laboris ad",
                            "schema": "Ut dolor incididunt"
                        }
                    ]
                }
            ],
            "hid": 43,
            "time": 711864381427,
            "uid": 38
        }
    },
    {
        "aid": 45,
        "details": {
            "path": "ex in",
            "summary": "nostrud velit pariatur id",
            "parameters": [
                {
                    "name": "日最门业",
                    "in": "ea reprehenderit dolor",
                    "description": "第流都江走系运名类除边民起。由知容实需社前便日务收教第米形非去命。片机确断火主义除四持强从青目号适结。山广得儿石际点实技改心物学已复马七。划特色料数务干元其团着内权声农给整。龙发条格示段样过个变心加至。且后年作近光社满体共世成想统。",
                    "required": false,
                    "schema": {
                        "type": "ex incididunt"
                    }
                },
                {
                    "name": "题确写老没",
                    "in": "exercitation et sint nisi",
                    "description": "直月安形进器将元本年有一群。及须过许流较色别专作成济调美生规北。革存收采里得儿政头体命线例机步自。发油时行市压处角难这只意后约断何严。设支积民品毛导造确自决较科则动就。下路再今料产口使更第制小内治直候听。",
                    "required": true,
                    "schema": {
                        "type": "quis occaecat in mollit"
                    }
                }
            ],
            "method": "POST",
            "responses": [
                {
                    "code": 95,
                    "description": "属利况广使率从由太长角派了风。支节象技委作对华与及经给铁。龙队种何事再向安元光具开院都角作。县究查强教内度细其观给素响龙己精究科。规期何区产决单当的十将联基族适计。百影种厂那青建性书由广土。群原义农省期流务我界报东保不验道。",
                    "content": [
                        {
                            "MIME": "ea velit laboris",
                            "schema": "reprehenderit commodo exercitation aute sit"
                        },
                        {
                            "MIME": "cupidatat cillum",
                            "schema": "laboris"
                        },
                        {
                            "MIME": "sed exercitation",
                            "schema": "in Duis"
                        }
                    ]
                }
            ],
            "hid": 83,
            "time": 874224010020,
            "uid": 62
        }
    },
    {
        "aid": 48,
        "details": {
            "path": "incididunt et",
            "summary": "ea esse consectetur dolore qui",
            "parameters": [
                {
                    "name": "条文完龙",
                    "in": "laborum esse irure Ut proident",
                    "description": "任直划叫直其备口习标她人类都交作参。大为己总往准工约九事就放什很。成美无局任统度院县际发把思两办度族。建长类集分中列究月自会层每报算今话圆。被什养决对响设照国题主与自活回且进。数而况物论子都第根空打以难造林。",
                    "required": false,
                    "schema": {
                        "type": "adipisicing"
                    }
                },
                {
                    "name": "设我在除步",
                    "in": "laborum sed ullamco Duis",
                    "description": "界领市界或即及信便传查平具事。维小段众统其快根维会革或数记子。八选五都日次做计值志张最战办保太把老。九它难利同事合划分维术南众。合又题证常里中矿算属任地称被将斗。系例过色元办进复养研效很单至却备。条入回酸县图化具此效再效准便油。",
                    "required": false,
                    "schema": {
                        "type": "adipisicing culpa pariatur"
                    }
                },
                {
                    "name": "究斯理",
                    "in": "ipsum in laborum",
                    "description": "支当心合手形代毛山史传我。与图组电对技商张力身回才中新党个。维听各出算直活支队段积段中从例以例。油电手万整流领元备安带类力行效。经飞题各品中白空活我风科容矿步为。",
                    "required": false,
                    "schema": {
                        "type": "consequat nisi pariatur dolore minim"
                    }
                },
                {
                    "name": "置达证全",
                    "in": "velit elit",
                    "description": "事无界满王他除全认当生安民。却离老通住术到白器电活处管也情今北力。正前打压统题儿酸即道近产联学较件也。型件图则个支济图多不导张角正号张想。",
                    "required": false,
                    "schema": {
                        "type": "aute"
                    }
                }
            ],
            "method": "DELETE",
            "responses": [
                {
                    "code": 32,
                    "description": "器养标布价极青性车队度格与家。根越场革有状应图为道总发满易土省音。格圆写公那身先最金民特按在转回米。平得确型料打学低看委所布走其开。置知出都究手称百机则节于周包接白。温由江很没采南常际离过心更达。",
                    "content": [
                        {
                            "MIME": "irure",
                            "schema": "veniam"
                        },
                        {
                            "MIME": "non fugiat",
                            "schema": "nisi aute dolor adipisicing aliqua"
                        },
                        {
                            "MIME": "exercitation in pariatur",
                            "schema": "reprehenderit dolore"
                        }
                    ]
                }
            ],
            "hid": 65,
            "time": 103105989926,
            "uid": 69
        }
    },
    {
        "aid": 44,
        "details": {
            "path": "esse",
            "summary": "dolore veniam eu cupidatat aliquip",
            "parameters": [
                {
                    "name": "被识响资其",
                    "in": "magna officia Lorem",
                    "description": "还即生例带系声治问再部内证教名王。却五没往千清引开期太志她提油明和质拉。候无验领理把备值江越我我求。天新导意置方拉被影对处习毛事关。量都飞月且况周成作里数命白。法须快记运西认千化原么照象。",
                    "required": false,
                    "schema": {
                        "type": "deserunt Lorem"
                    }
                },
                {
                    "name": "情要后省战知",
                    "in": "eiusmod ut",
                    "description": "细民难教还期已资加养完米复备半业科因。认任知极指严六可地活广群。好才求设外级术十事适又天走计育。",
                    "required": false,
                    "schema": {
                        "type": "eu"
                    }
                },
                {
                    "name": "五运每",
                    "in": "aliquip quis voluptate",
                    "description": "际温目步青可划选没济型门适。是思者气点专命式市农酸量开少行合。目她议老育资月品回新观必给增做去。",
                    "required": true,
                    "schema": {
                        "type": "consectetur cillum ut irure Excepteur"
                    }
                },
                {
                    "name": "众很新入",
                    "in": "consequat cillum",
                    "description": "思接联备公又传北青算都观增等达。选系声将生以儿好至般消际传持管路。业计通此命将者回为定少书识公层度感。计严效适以面温几称中理得青级他利易。还关器却温得正等能真处理关处立县。这身流同然细素感约收难农周。",
                    "required": true,
                    "schema": {
                        "type": "magna id Lorem cillum pariatur"
                    }
                }
            ],
            "method": "PUT",
            "responses": [
                {
                    "code": 71,
                    "description": "先查出候走百属号治毛委记事。它最选布研化前况干百备写五这般清第经。持者发劳被已共建度进运两革月。速自理日人起名义调林持资林取代火。交切地应员保身酸公立接石火。",
                    "content": [
                        {
                            "MIME": "consectetur elit nostrud aliquip",
                            "schema": "enim tempor elit nisi"
                        }
                    ]
                },
                {
                    "code": 22,
                    "description": "化众车学对造种单音处看铁造又军。西者种适广好不论路设细保经过北。是内改布果活将事在系半完林车么矿。议时无力回没象要究它共单华况。",
                    "content": [
                        {
                            "MIME": "mollit pariatur elit veniam voluptate",
                            "schema": "Duis aliqua"
                        },
                        {
                            "MIME": "incididunt nulla reprehenderit voluptate dolore",
                            "schema": "qui ad enim"
                        }
                    ]
                }
            ],
            "hid": 39,
            "time": 82739449638,
            "uid": 3
        }
    },
    {
        "aid": 43,
        "details": {
            "path": "in voluptate eiusmod mollit",
            "summary": "sunt",
            "parameters": [
                {
                    "name": "实么用单能技",
                    "in": "anim enim magna consequat sed",
                    "description": "需收关会收教保东产领交器他样去对。如深体响米战已段克管样同多性山局持场。家来算厂切达信引万层九程万机。府林验调劳确门联道治单利持亲并明子。平二林议名酸之天要老明自种往。",
                    "required": true,
                    "schema": {
                        "type": "ad Lorem"
                    }
                },
                {
                    "name": "队问已想阶光",
                    "in": "amet adipisicing culpa sit irure",
                    "description": "日极由门它想开如天传大极按无后体。和风风到年斗准证过张系增三热道八比。五产始列关片光员步他正于更法便。面省布织了好并意该光率所思具。",
                    "required": true,
                    "schema": {
                        "type": "proident exercitation"
                    }
                },
                {
                    "name": "百记级说复",
                    "in": "non in",
                    "description": "文看团划经该我规建适业合八统始。复来统西低列走县战己拉此边门年。带色生你导住为史表线验建自响土。走高头委办果林备正议光于斯保。",
                    "required": false,
                    "schema": {
                        "type": "in incididunt occaecat tempor"
                    }
                }
            ],
            "method": "GET",
            "responses": [
                {
                    "code": 37,
                    "description": "路别流周细了题期选达常取常却般率参广。线机过部目后等流众林王需水消。影程万资就西及如强报于适属化法该。况反自九争自断处只空话明严达可公格须。十断王细近运北向是严要已已上。",
                    "content": [
                        {
                            "MIME": "sint",
                            "schema": "sit eu"
                        },
                        {
                            "MIME": "laborum Lorem sed",
                            "schema": "minim cillum laborum"
                        },
                        {
                            "MIME": "officia irure commodo qui",
                            "schema": "sed voluptate in exercitation"
                        },
                        {
                            "MIME": "id culpa velit",
                            "schema": "nisi in magna"
                        },
                        {
                            "MIME": "incididunt eiusmod ut fugiat",
                            "schema": "in sunt consequat"
                        }
                    ]
                },
                {
                    "code": 57,
                    "description": "改节始型身斗备参影工法关确改。政派华加清关难只最表次深角知周市素。公图争最标派集接经认石众其。水利除际等设真许基原好导化和不引。划江必历果品理也青观合里空任身指。代般意对自被数理分打认领划改许。",
                    "content": [
                        {
                            "MIME": "pariatur et",
                            "schema": "anim elit pariatur nostrud tempor"
                        },
                        {
                            "MIME": "labore Excepteur sunt minim ex",
                            "schema": "Duis aliqua"
                        },
                        {
                            "MIME": "esse in et",
                            "schema": "laboris incididunt"
                        },
                        {
                            "MIME": "Lorem",
                            "schema": "occaecat laboris dolore aute"
                        },
                        {
                            "MIME": "nisi est",
                            "schema": "et Ut eu sit"
                        }
                    ]
                },
                {
                    "code": 66,
                    "description": "用式改小济完上人石矿习重海情口传。整少委划算术持志工严法任影民部系非。传表不求第万感用省中红金习。己人流程达成分然京细复值王。",
                    "content": [
                        {
                            "MIME": "minim in anim irure est",
                            "schema": "culpa anim veniam minim"
                        },
                        {
                            "MIME": "sunt qui reprehenderit ex eiusmod",
                            "schema": "laboris aute"
                        },
                        {
                            "MIME": "sint et in incididunt",
                            "schema": "do"
                        }
                    ]
                },
                {
                    "code": 60,
                    "description": "研手指极么者般就商集什转农发南他。造写种示统记型重回世志为学音消决状西。造亲要青严京开观情华族公内联片地确。实法历深于带查名又就使众习法术。色国提必百众公采和几存了感外再太车。",
                    "content": [
                        {
                            "MIME": "laborum ullamco Excepteur",
                            "schema": "ea proident"
                        },
                        {
                            "MIME": "dolor aliquip cupidatat reprehenderit ad",
                            "schema": "laboris"
                        }
                    ]
                }
            ],
            "hid": 21,
            "time": 872095411524,
            "uid": 59
        }
    }
]
const store = useStore();
const currAid = computed(() => store.state.aid)
const tableRowClassName: (arg0: { row: APItem }) => string = ({ row }) => {
    return row.aid == currAid.value ? 'APIRowSelected' : '';
};
const selectAPI = (row: APItem) => {
    store.commit(storeMutation.SELECT_INTERFACE, { aid: row.aid })
}
</script>
<style>
.APIRowSelected {
    --el-table-tr-bg-color: var(--el-border-color-dark);
}
</style>