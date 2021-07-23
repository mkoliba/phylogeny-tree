// require('../polyfill');
import '@mkoliba/phylogeny-tree-plugin-interactions/styles.css';
import '@mkoliba/phylogeny-tree-plugin-context-menu/styles.css';

import createTree from '@mkoliba/phylogeny-tree/createTree';
import { TreeTypes } from '@mkoliba/phylogeny-tree/constants';

import logPlugin from '../../plugins/log';

import metadataPlugin from '@mkoliba/phylogeny-tree-plugin-metadata/index';
import interactionsPlugin from '@mkoliba/phylogeny-tree-plugin-interactions/index';
import contextMenuPlugin from '@mkoliba/phylogeny-tree-plugin-context-menu/index';

const newick =
// '(Bovine:0.69395,(Gibbon:0.36079,(Orangutan:0.33636,(Gorilla:0.17147,(Chimp:0.19268,Human:0.11927):0.08386):0.06124):0.15057):0.54939,Mouse:1.21460);'
'(((21951_8#18:0.15212620060877285,(((21951_8#32:0.011515371830543186,21951_8#69:0.017600864262248717):0.0963285741380197,((21951_8#16:0.00006812717486381903,(21951_8#40:0.00004115453662117963,21951_8#118:0.00009770805116865455):0.0001892455831326023):0.007841684672745097,((21951_8#126:0.00001028069912428764,21951_8#123:0.00000514690205877244):0.000010668828753501725,(21951_8#157:0.000036002406046675706,((21951_8#131:0.000005141935876695758,(21951_8#130:0.000020589235933121675,21951_8#129:0.000030878030383429955):0.000005139434976597634):0.000005139415001131908,21951_8#128:0.00000514149659741614):0.0000056570976739167556):0.00005048695222226174):0.009059409389342687):0.1016475436635344):0.028157112562134767,(21951_8#27:0.007004856579896246,21951_8#64:0.007736915585373427):0.11821930100656702):0.02754341726114934):0.049658821085991844,((21951_8#87:0.03494564079799417,(21951_8#148:0.002041475763573386,((((21951_8#86:0.000001000000500073206,21951_8#85:0.000001000000500073206):0.0049406204736160975,21951_8#104:0.0017259766581979585):0.008386401755021922,((((((21951_8#61:0.00027372155643168306,21951_8#2:0.000014989093763961847):0.00238280492276588,(21951_8#83:0.000035936919978607484,21951_8#105:0.00018017922998864178):0.001797606190879375):0.000470434890130933,((21951_8#96:0.010158591593298627,21951_8#78:0.001488703895076049):0.001001177735174552,21951_8#15:0.0010494017732186611):0.003086967395602158):0.06870446097802729,21951_8#3:0.003546970659657811):0.009468627131572205,21951_8#95:0.009882550054158779):0.005525080257158033,(21951_8#101:0.0002425306747785294,((21951_8#116:0.00005656217853355905,21951_8#38:0.00001028211635223375):0.00007199575651251067,(21951_8#125:0.000005139482625482472,((21951_8#153:0.000015422105787310514,21951_8#127:0.000001000000500073206):0.000025703528038933943,(21951_8#151:0.000015422083156801936,21951_8#124:0.0000051406759755123765):0.0000010000005000176948):0.0000010000005000176948):0.0009726811101321564):0.00007652755303577674):0.01284081841730883):0.0005711177773981002):0.007806065987460087,(((21951_8#114:0.0000010000005000176948,21951_8#113:0.00007709207637546234):0.000010277997788521454,(21951_8#99:0.000015428857881749636,(21951_8#37:0.000020571361990240344,21951_8#92:0.00002057256005799646):0.0000010000005000176948):0.0000010000005000176948):0.000056507508689185304,(21951_8#30:0.00010800354276740975,(21951_8#171:0.0002880242648668485,(21951_8#178:0.000051643366869080776,21951_8#55:0.00010783209490999868):0.0002263527247331476):0.0000010000005000176948):0.0000010000005000176948):0.037861221382340826):0.010025482662328111):0.039274478401006396):0.06115509399208752,((((21951_8#177:0.00003109091336495062,21951_8#119:0.00003565096771629417):0.006206319055287235,(21951_8#147:0.0022697856973123987,21951_8#144:0.035145000093794954):0.0014433011668054663):0.042675020490363647,((21951_8#7:0.04401888498410339,21951_8#93:0.05348195787220872):0.009577903708398505,((((21951_8#6:0.003451593834892297,(21951_8#156:0.0020632998578893336,(21951_8#88:0.0018390611290607928,(21951_8#142:0.00001206834921702038,21951_8#184:0.000034214276820154765):0.0015998346215611026):0.0007408822699881412):0.0007993360338112709):0.046429163468144796,(21951_8#45:0.03872869376938182,((21951_8#182:0.00002560532483247835,((21951_8#135:0.000015410830476625392,(21951_8#133:0.00001027530516217734,((21951_8#134:0.000005135793596400262,(21951_8#140:0.00005649471863566902,21951_8#137:0.000005135681673429371):0.0000010000004999621837):0.00005136114764514588,21951_8#136:0.000015407702096126297):0.000001000000500073206):0.0000010000004999621837):0.00003594667939843532,(21951_8#183:0.000046220954730058494,((21951_8#179:0.000005136744526512693,21951_8#138:0.0000051366767975791205):0.000001000000500073206,21951_8#180:0.00002568245703549188):0.0000010000004999621837):0.000001000000500073206):0.000051445766162006024):0.011115453802040931,(21951_8#139:0.0000102544703927121,21951_8#141:0.000005175657568856629):0.010451956732531298):0.03173572541172298):0.011206924993379053):0.00784544581679647,(21951_8#152:0.044370742670148455,(21951_8#169:0.037340209591202544,21951_8#170:0.042954494677211685):0.010668975316835971):0.00713472897794043):0.007359629951247615,((21951_8#109:0.03542954851431973,21951_8#82:0.036624279067763776):0.013894294621528247,((21951_8#120:0.00009424838111415923,(21951_8#164:0.000005138706127172377,21951_8#163:0.0000010000005000176948):0.00016788725514527147):0.048273663770171726,(21951_8#90:0.01333081816425341,(21951_8#143:0.0023415136897301236,21951_8#154:0.007540491277177375):0.011786106379966466):0.03343629028700712):0.009283448166363506):0.022521280102057784):0.009680151481425092):0.009417907861897445):0.029258689660458637,(21951_8#19:0.025297052054378377,((21951_8#41:0.009595503881973166,21951_8#53:0.0006141611962979798):0.005983944732062985,(((((21951_8#75:0.000005141920647711018,21951_8#76:0.000005135377935339136):0.00016963889245302788,((21951_8#68:0.00011313067560025925,21951_8#89:0.00023633696863478715):0.000005133840149884605,21951_8#33:0.00006676674512962055):0.000025593539139667776):0.0010294671498326524,(21951_8#28:0.0004426935964135792,(21951_8#70:0.0001119954240211829,21951_8#50:0.00003697702984073459):0.002966353104808084):0.000517401119846661):0.000666379541566009,21951_8#25:0.002931315577137217):0.0001704572069424204,((21951_8#145:0.00006194440027584847,((21951_8#132:0.000010271675684125903,(21951_8#159:0.000001000000500073206,(21951_8#155:0.0000010000004999621837,(21951_8#158:0.000020542233963638523,(21951_8#160:0.000001000000500073206,21951_8#161:0.000001000000500073206):0.000005135630841701655):0.0000010000004999621837):0.000001000000500073206):0.000020544284902390686):0.000015407837654968226,(21951_8#166:0.000015406453203636872,((21951_8#167:0.00000513615522534927,21951_8#165:0.00001540794348320329):0.000001000000500073206,(21951_8#175:0.000010270804494338925,21951_8#174:0.000001000000500073206):0.000005135386816124132):0.0000010000004999621837):0.000010270904691744853):0.000010000921039199362):0.006745417231009521,((21951_8#150:0.000035937540698638415,21951_8#122:0.000005136599496968763):0.000001000000500073206,21951_8#149:0.00004620342312744441):0.007301644051427636):0.0013469885569038498):0.009543303736594955):0.014586428197574053):0.03908837705612056):0.041610797342987005):0.15386404004462667):0.006005944908109684,(((((21951_8#35:0.00011690263063723894,(((21951_8#115:0.0002478132768338748,(21951_8#5:0.000160977630013992,21951_8#29:0.00018723878697990415):0.0000920995166584504):0.000007473767335564041,((21951_8#106:0.000010231544087968558,21951_8#107:0.000010230421433776726):0.0007638067564224027,21951_8#71:0.0012375413001982638):0.00035656187963539754):0.000001000000500073206,((((21951_8#14:0.00019448274883260286,(21951_8#57:0.0000051159920243515344,(21951_8#117:0.00008697888216846472,21951_8#58:0.00001535111858563809):0.000001000000500073206):0.000051161303040281325):0.00006652273596274849,21951_8#56:0.0004096228009515812):0.000005105924648196591,((21951_8#46:0.0003583417635273367,(21951_8#60:0.00013305227487414584,(21951_8#36:0.00008186540491139649,((21951_8#26:0.00004605199379414948,21951_8#62:0.000030714937477638315):0.000025582656161926565,((21951_8#8:0.000025583181393007415,21951_8#12:0.000015350054115126355):0.00002046670435995601,(((21951_8#11:0.000001000000500073206,21951_8#10:0.000001000000500073206):0.0000767578864925289,21951_8#110:0.00020470445013198724):0.000015344299007180595,(21951_8#54:0.000143344564696668,((21951_8#13:0.00003069917858466997,(21951_8#31:0.00003069784661924313,21951_8#43:0.000020465082496645692):0.000001000000500073206):0.000001000000500073206,21951_8#49:0.00012807007613113708):0.00004747990359765808):0.000001000000500073206):0.000001000000500073206):0.000001000000500073206):0.000001000000500073206):0.000010548633597062818):0.00003692910041708242):0.00006331189145891702,((21951_8#102:0.000001000000500073206,21951_8#103:0.000010232769042439749):0.00005628379369482239,(21951_8#77:0.00008194980453379852,(21951_8#42:0.0004569282713349221,21951_8#23:0.00002054764270087439):0.000005117101938845181):0.00004095067316645107):0.000015348201206299983):0.000005274241306585381):0.000001000000500073206,((21951_8#67:0.00014371320799833054,(21951_8#98:0.000001000000500073206,21951_8#97:0.000001000000500073206):0.000030696126184559525):0.00003069639695840731,(21951_8#80:0.00013306622149322767,(21951_8#17:0.000025581817057251932,((21951_8#81:0.000001000000500073206,21951_8#52:0.000015363812511659525):0.00006650954533415909,(21951_8#66:0.000056292004826374864,(21951_8#91:0.000020487924123013812,21951_8#48:0.0002968258606074192):0.000005114271489858879):0.000001000000500073206):0.00006139750131639587):0.000030696984959499574):0.000010232938845278206):0.0002712145343246597):0.000001000000500073206):0.000001000000500073206):0.001030061393983428,(21951_8#79:0.00009721198607171022,(21951_8#39:0.00022535760646213987,(21951_8#108:0.0000306938330872919,(21951_8#1:0.000005115565796298682,(21951_8#74:0.000005115891010598617,(21951_8#94:0.000010236260942542152,21951_8#73:0.000001000000500073206):0.000001000000500073206):0.000001000000500073206):0.000001000000500073206):0.0000818550239535254):0.000001000000500073206):0.0014975711257335655):0.016996791827795565,(21951_8#100:0.00018915823693776979,21951_8#63:0.00018454947617496664):0.01813560189962382):0.06662166148455406,((21951_8#121:0.0003460316892797133,21951_8#4:0.00019101719167213815):0.06344317962232826,((21951_8#44:0.00007634323117233777,21951_8#47:0.00010249937512873952):0.06024552500116154,(21951_8#21:0.0014680273152787304,(21951_8#72:0.000721556210958596,21951_8#9:0.02379215338446805):0.0018445274008523915):0.05860462756442952):0.01590133685567452):0.033245326071089654):0.19812655086350078,((21951_8#162:0.029811720294038113,(21951_8#84:0.017001485319773912,((21951_8#181:0.00012059318678980802,21951_8#65:0.00020321301962566984):0.012959829345176588,((21951_8#24:0.000001000000500073206):0.003486678485533523,21951_8#34:0.005541504685683374):0.015809292736875036):0.025136891226183677):0.018382394024382576):0.0718356706484582,(((21951_8#173:0.00000518920588565841,21951_8#172:0.000015370710139572807):0.06740675654705208,(21951_8#51:0.000018984202342475776,(21951_8#111:0.00001539324364507877,21951_8#112:0.000015393583678635636):0.00006825151015787956):0.07613100349691548):0.042912193359108675,(21951_8#20:0.013439288103841318,21951_8#176:0.013080976822182344):0.08380322604877732):0.026435214033284526):0.06451915175260742):0.045132606723834234);'
;

const tree = createTree(
  document.querySelector('#phylocanvas'),
  {
    source: newick,
    alignLabels: true,
    renderLeafLabels: false,
    showNodes: true,
    fontFamily: 'Arial',
    fontSize: 16,
    // type: TreeTypes.Circular,
    type: TreeTypes.Diagonal,
    // type: TreeTypes.Hierarchical,
    // type: TreeTypes.Radial,
    // type: TreeTypes.Rectangular,
    // padding: 0,
    metadata: {
      showLabels: false,
      showHeaders: true,
      blockPadding: 2,
      blockLength: 28,
      headerFontWeight: 'bold',
      fillStyle: 'rgba(0, 0, 0, 0.87)',
      // values: {
      //   Mouse: {
      //     colA: { colour: 'black', label: 'very long label..........' },
      //     colB: 'red',
      //   },
      //   Human: {
      //     colA: 'triangle',
      //     colB: { colour: 'green', label: 'green' },
      //   },
      //   Gibbon: {
      //     colA: 'star',
      //     colB: 'blue',
      //   },
      //   Bovine: {
      //     colA: 'hexagon',
      //     colB: { colour: 'orange', label: 'orange' },
      //   },
      //   Chimp: {
      //     colA: 'hexastar',
      //     colB: 'grey',
      //   },
      //   Orangutan: {
      //     label: 'octastar',
      //     colB: 'indigo',
      //   },
      // },
      columns: [ 'colA', 'colB' ],
    },
  },
  [
    contextMenuPlugin,
    logPlugin,
    // drawStepsPlugin,
    interactionsPlugin,
    metadataPlugin,
  ]
);

const metadataValues = {};
const metadataColumns = [
  'Column 1',
  'Columnnnnnnnnnnnnn 2',
  'Column 3 Column 3',
  'C4',
];

const { leafNodes } = tree.getVirtualTree();
for (const node of leafNodes) {
  metadataValues[node.id] = {};
  for (let index = 0; index < metadataColumns.length; index++) {
    metadataValues[node.id][metadataColumns[index]] = {
      label: (leafNodes.indexOf(node) % 2 === 0) ? 'red' : 'blue',
      colour: (leafNodes.indexOf(node) % 2 === 0) ? 'red' : 'blue',
    };
  }
}

tree.setState({
  // minScale: 0,
  metadata: {
    ...tree.state.metadata,
    values: metadataValues,
    columns: metadataColumns,
  },
});

tree.fitInPanel();

window.tree = tree;
