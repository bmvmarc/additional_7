  module.exports = function solveSudoku(matrix) {
        let resMatrix = matrix;
        resMatrix = doIt(resMatrix)[0];
        return resMatrix;
  }

  function doIt(matr) {

    let opt;

     for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {

            if (matr[r][c] === 0) {

                opt = getProbableOptions(r, c, matr);
                if (opt.length === 1) {
                    matr[r][c] = opt[0];
                }
               else if (opt.length === 0) {
                   return [matr, false];
                }
                else {
                    let returned;
                    for(let i = 0; i < opt.length; i++){

                        let matrtemp = clone(matr);
                        matrtemp[r][c] = opt[i];
                        returned = doIt(matrtemp);

                        if (returned[1]){
                            matr = clone(returned[0]);
                            return [matr, true];
                        }
                    }
                    return [matr, returned[1]];
                }
            }
        }
    }

    return [matr, true];
  }

  function getProbableOptions(row, col, matrix) {

      const res = [];
      for (value = 1; value <=9; value++) {

          let thereIsInArea = false;
          // есть ли в столбике?
          for (let r = 0; r < 9; r++) {
              if (value === matrix[r][col]){
                  thereIsInArea = true;
                  break;
              }
          }

          // есть ли в строке?
          for (let c = 0; c < 9; c++) {
              if (value === matrix[row][c]){
                  thereIsInArea = true;
                  break;
              }
          }

          // есть ли в квадратике?
          let rowFrom, colFrom;
          if (row < 3)
              rowFrom = 0;
          else if (row < 6)
              rowFrom = 3;
          else
              rowFrom = 6;

          if (col < 3)
              colFrom = 0;
          else if (col < 6)
              colFrom = 3;
          else
              colFrom = 6;

          for (let r = rowFrom; r < rowFrom + 3; r++) {
              for (let c = colFrom; c < colFrom + 3; c++) {

                  if (value === matrix[r][c]) {
                      thereIsInArea = true;
                      break;
                  }
              }
          }

          if (!thereIsInArea){
              res.push(value);
          }
      }

      return res;
  }

  function clone(arr) {
      var newObj = (arr instanceof Array) ? [] : {};
      for (i in arr) {
          if (i == 'clone')
              continue;
          if (arr[i] && typeof arr[i] == "object") {
              newObj[i] = clone(arr[i]);
          }
          else
              newObj[i] = arr[i]
      } return newObj;
  }
