import { compareValues } from "main/utils/sortHelper"

describe("sortHelper tests", () => {
  
   var singers = [];

   const tyler = { name: 'Steven Tyler', band: 'Aerosmith', born: 1948 };
   const carpenter = { name: 'Karen Carpenter', band: 'The Carpenters', born: 1950 };
   const cobain = { name: 'Kurt Cobain', band: 'Nirvana', born: 1967 };
   const nicks = { name: 'Stevie Nicks', band: 'Fleetwood Mac', born: 1948 };

  beforeEach(() => {
    singers = [ tyler, carpenter, cobain, nicks ]
  });

  test("should sort by name", async () => {
    singers.sort(compareValues('name'));
    expect(singers).toEqual( [carpenter, cobain, tyler, nicks] )
  });

  test("should sort by band, descending", async () => {
    singers.sort(compareValues('band', 'desc'));
    expect(singers).toEqual( [carpenter, cobain, nicks, tyler] )
  });

  test("should sort by year born", async () => {
    singers.sort(compareValues('born'));
    expect(singers).toEqual( [tyler, nicks, carpenter, cobain] )
  });

  test("should not sort at all", async () => {
    singers.sort(compareValues('potato'));
    expect(singers).toEqual( singers )
  });
  
});
