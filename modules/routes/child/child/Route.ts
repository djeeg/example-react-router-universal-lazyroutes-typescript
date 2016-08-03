import SubAbout from '../../../components/SubAbout'

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

console.log("SubAboutRoute - sleep")
sleep(400);

export default {
  path: 'subabout',
  component: SubAbout//,
  // onEnter: function enter(nextState, replaceState, callback) {
  //     setTimeout(callback, 1000);
  // },
}
