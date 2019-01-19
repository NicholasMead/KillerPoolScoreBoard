// import { expect, assert } from 'chai';
// import { KillerPoolScoreBoardApplication } from '../src/KillerPoolScoreBoardApplication'

// describe('KillerPoolScoreBoardApplication', () => {
//     it('can be initialized without an initializer', () => {
//         new KillerPoolScoreBoardApplication();
//     });

//     describe("#AddPlayer()", () => {
//         it('Adds a new player to the game', () => {
//             var app = new KillerPoolScoreBoardApplication()

//             app.AddPlayer("Nick");

//             expect(app.GetPlayers().length).to.equal(1);
//             expect(app.GetPlayers()[0].Name).to.eq("Nick");
//         });

//         it('Can create multiple players', () => {
//             var app = new KillerPoolScoreBoardApplication()

//             app.AddPlayer("Nick");
//             app.AddPlayer("Rupe");
//             app.AddPlayer("Merlin");

//             expect(app.GetPlayers().length).to.equal(3);
//             expect(app.GetPlayers()[1].Name).to.eq("Rupe");
//         });
//     });
// });