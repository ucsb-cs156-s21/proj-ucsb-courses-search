
// compareValues comes from this article
//   https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
// It is used to sort arrays of objects, like this:
// For
//  const singers = [
//     { name: 'Steven Tyler', band: 'Aerosmith', born: 1948 },
//     { name: 'Karen Carpenter', band: 'The Carpenters', born: 1950 },
//     { name: 'Kurt Cobain', band: 'Nirvana', born: 1967 },
//     { name: 'Stevie Nicks', band: 'Fleetwood Mac', born: 1948 },
//   ];
//
// Use: 
// // array is sorted by band, in ascending order by default
// singers.sort(compareValues('band'));

// // array is sorted by band in descending order
// singers.sort(compareValues('band', 'desc'));

// // array is sorted by name in ascending order
// singers.sort(compareValues('name'));

// // array is sorted by date if birth in descending order
// singers.sort(compareValues('born', 'desc'));

export function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }