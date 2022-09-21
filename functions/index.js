const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const app = express();


const serviceAccount = require("./dev-tesis-firebase-adminsdk-zn3ot-3f297512ec.json");

const dataCarga = require("./data.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const CM = (Cromosomas) => {
  console.log("*--------------------Cruzeeeeeeeeeeee----------------------------*");
  const cruze1 = 1;
  const typeSort = Math.floor(Math.random() * 3);
  let CromosomaBucle = null;

  console.log("tipo de sort: ", typeSort);

  if (typeSort === 1) {
    CromosomaBucle = Cromosomas.sort();
  } else if (typeSort === 2) {
    CromosomaBucle = Cromosomas.sort();
    CromosomaBucle = CromosomaBucle.reverse();
  } else {
    CromosomaBucle = Cromosomas;
  }
  console.log("Cruze posisocomn:", cruze1);
  const CromosomaTemporal = CromosomaBucle;
  CromosomaBucle.forEach( (item, index) => {
    if ((index+1) % 2) {
      const cromosoma_1_temporal = item.slice(0, cruze1);
      const cromosoma_1_nuevo = cromosoma_1_temporal.concat(CromosomaBucle[(index+1)].slice(cruze1));

      const cromosoma_2_temporal = CromosomaBucle[(index+1)].slice(0, cruze1);
      CromosomaTemporal[(index+1)] = cromosoma_2_temporal.concat(item.slice(cruze1));

      CromosomaTemporal[(index)] = cromosoma_1_nuevo;
    }
  });
  console.log("-------------Resultados------------------");
  console.log(CromosomaTemporal);
  return CromosomaTemporal;
};


const funcionCruzeMutacion = (Cromosomas) => {
  console.log("*--------------------Cruzeeeeeeeeeeee----------------------------*");
  const cruze1 = 1;
  let CromosomaBucle = null;
  CromosomaBucle = Cromosomas.sort(() => {
    return (Math.random() - 0.5);
  });
  console.log(CromosomaBucle);
  const CromosomaTemporal = CromosomaBucle;
  CromosomaBucle.forEach( (item, index) => {
    if ((index+1) % 2) {
      const mutacion = Boolean(Math.round(Math.random()));
      if (mutacion === false) {
        const cromosoma_1_temporal = item.slice(0, cruze1);
        const cromosoma_1_nuevo = cromosoma_1_temporal.concat(CromosomaBucle[(index+1)].slice(cruze1));

        const cromosoma_2_temporal = CromosomaBucle[(index+1)].slice(0, cruze1);
        CromosomaTemporal[(index+1)] = cromosoma_2_temporal.concat(item.slice(cruze1));

        CromosomaTemporal[(index)] = cromosoma_1_nuevo;
      } else {
        // const mutacion = Boolean(Math.round(Math.random()));
        // const cromosoma_1_temporal = item.slice(0, cruze1);
        // const cromosoma_1_nuevo = cromosoma_1_temporal.concat(CromosomaBucle[(index+1)].slice(cruze1));
        //
        // const cromosoma_2_temporal = CromosomaBucle[(index+1)].slice(0, cruze1);
        // CromosomaTemporal[(index+1)] = cromosoma_2_temporal.concat(item.slice(cruze1));
        //
        // CromosomaTemporal[(index)] = cromosoma_1_nuevo;
      }
    }
  });
  console.log("-------------Resultados------------------");
  console.log(CromosomaTemporal);
  return CromosomaTemporal;
};

const funcionFitnesDesayuno = (cromosoma, liquidos, alimentos, objetivoCaloria, ObjetivoProteina, dias) => {
  let calculo_calorias = 0;
  let calculo_proteinas = 0;
  let dia_1_liquido = 0;
  let dia_2_liquido = 0;
  let dia_3_liquido = 0;
  let dia_4_liquido = 0;
  let dia_5_liquido = 0;
  let dia_6_liquido = 0;
  let dia_7_liquido = 0;
  let dia_1_alimento = 0;
  let dia_2_alimento = 0;
  let dia_3_alimento = 0;
  let dia_4_alimento = 0;
  let dia_5_alimento = 0;
  let dia_6_alimento = 0;
  let dia_7_alimento = 0;
  if (dias === 1) {
    dia_1_liquido = liquidos[cromosoma[0]];
    dia_1_alimento = alimentos[cromosoma[1]];
    const factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    calculo_calorias = (dia_1_liquido.Cals) + (dia_1_alimento.Cals * factorCantidadAlimento);
    calculo_proteinas = (dia_1_liquido.Prot) + (dia_1_alimento.Prot * factorCantidadAlimento);
    if ( calculo_calorias >= (objetivoCaloria-60) && calculo_calorias <= (objetivoCaloria+60)) {
      dia_1_alimento.Cals = dia_1_alimento.Cals * factorCantidadAlimento;
      dia_1_alimento.Prot = dia_1_alimento.Prot * factorCantidadAlimento;
      dia_1_alimento.Grasa = dia_1_alimento.Grasa * factorCantidadAlimento;
      switch (factorCantidadAlimento) {
        case 2:
          dia_1_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_1_alimento.cantidad = "3 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }
      return {
        resultado: true,
        desayuno: {
          primerElemento: dia_1_liquido,
          segundoElemento: dia_1_alimento,
        },
      };
    } else {
      return {
        resultado: false,
        desayuno: {
          primerElemento: dia_1_liquido,
          segundoElemento: dia_1_alimento,
        },
      };
    }
  } else if (dias === 2) {
    dia_1_liquido = liquidos[cromosoma[0][0]];
    dia_1_alimento = alimentos[cromosoma[0][1]];
    dia_2_liquido = liquidos[cromosoma[1][0]];
    dia_2_alimento = alimentos[cromosoma[1][1]];
    const factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    calculo_calorias = dia_1_liquido.Cals + (dia_1_alimento.Cals * factorCantidadAlimento) + dia_2_liquido.Cals + (dia_2_alimento.Cals * dia2_factorCantidadAlimento);
    calculo_proteinas = dia_1_liquido.Prot + dia_1_alimento.Prot + dia_2_liquido.Prot + dia_2_alimento.Prot;
    if ( calculo_calorias >= (objetivoCaloria-120) && calculo_calorias <= (objetivoCaloria+120)) {
      dia_1_alimento.Cals = dia_1_alimento.Cals * factorCantidadAlimento;
      dia_1_alimento.Prot = dia_1_alimento.Prot * factorCantidadAlimento;
      dia_1_alimento.Grasa = dia_1_alimento.Grasa * factorCantidadAlimento;
      switch (factorCantidadAlimento) {
        case 2:
          dia_1_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_1_alimento.cantidad = "3 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_2_alimento.Cals = dia_2_alimento.Cals * dia2_factorCantidadAlimento;
      dia_2_alimento.Prot = dia_2_alimento.Prot * dia2_factorCantidadAlimento;
      dia_2_alimento.Grasa = dia_2_alimento.Grasa * dia2_factorCantidadAlimento;
      switch (dia2_factorCantidadAlimento) {
        case 2:
          dia_2_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_2_alimento.cantidad = "3 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }
      return {
        resultado: true,
        desayuno: {
          primerElemento: dia_1_liquido,
          segundoElemento: dia_1_alimento,
        },
        desayuno2: {
          primerElemento: dia_2_liquido,
          segundoElemento: dia_2_alimento,
        },
      };
    } else {
      return {
        resultado: false,
        desayuno: {
          primerElemento: dia_1_liquido,
          segundoElemento: dia_1_alimento,
        },
        desayuno2: {
          primerElemento: dia_2_liquido,
          segundoElemento: dia_2_alimento,
        },
      };
    }
  } else if (dias === 3) {
    dia_1_liquido = liquidos[cromosoma[0][0]];
    dia_1_alimento = alimentos[cromosoma[0][1]];
    dia_2_liquido = liquidos[cromosoma[1][0]];
    dia_2_alimento = alimentos[cromosoma[1][1]];
    dia_3_liquido = liquidos[cromosoma[2][0]];
    dia_3_alimento = alimentos[cromosoma[2][1]];
    const factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    calculo_calorias = dia_1_liquido.Cals + (dia_1_alimento.Cals * factorCantidadAlimento) + dia_2_liquido.Cals + (dia_2_alimento.Cals * dia2_factorCantidadAlimento) + dia_3_liquido.Cals + (dia_3_alimento.Cals * dia3_factorCantidadAlimento);
    calculo_proteinas = dia_1_liquido.Prot + dia_1_alimento.Prot + dia_2_liquido.Prot + dia_2_alimento.Prot + dia_3_liquido.Prot + dia_3_alimento.Prot;
    if ( calculo_calorias >= (objetivoCaloria-180) && calculo_calorias <= (objetivoCaloria+180)) {
      dia_1_alimento.Cals = dia_1_alimento.Cals * factorCantidadAlimento;
      dia_1_alimento.Prot = dia_1_alimento.Prot * factorCantidadAlimento;
      dia_1_alimento.Grasa = dia_1_alimento.Grasa * factorCantidadAlimento;
      switch (factorCantidadAlimento) {
        case 2:
          dia_1_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_1_alimento.cantidad = "3 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_2_alimento.Cals = dia_2_alimento.Cals * dia2_factorCantidadAlimento;
      dia_2_alimento.Prot = dia_2_alimento.Prot * dia2_factorCantidadAlimento;
      dia_2_alimento.Grasa = dia_2_alimento.Grasa * dia2_factorCantidadAlimento;
      switch (dia2_factorCantidadAlimento) {
        case 2:
          dia_2_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_2_alimento.cantidad = "3 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_3_alimento.Cals = dia_3_alimento.Cals * dia3_factorCantidadAlimento;
      dia_3_alimento.Prot = dia_3_alimento.Prot * dia3_factorCantidadAlimento;
      dia_3_alimento.Grasa = dia_3_alimento.Grasa * dia3_factorCantidadAlimento;
      switch (dia3_factorCantidadAlimento) {
        case 2:
          dia_3_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_3_alimento.cantidad = "3 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }
      return {
        resultado: true,
        desayuno: {
          primerElemento: dia_1_liquido,
          segundoElemento: dia_1_alimento,
        },
        desayuno2: {
          primerElemento: dia_2_liquido,
          segundoElemento: dia_2_alimento,
        },
        desayuno3: {
          primerElemento: dia_3_liquido,
          segundoElemento: dia_3_alimento,
        },
      };
    } else {
      return {
        resultado: false,
        desayuno: {
          primerElemento: dia_1_liquido,
          segundoElemento: dia_1_alimento,
        },
        desayuno2: {
          primerElemento: dia_2_liquido,
          segundoElemento: dia_2_alimento,
        },
        desayuno3: {
          primerElemento: dia_3_liquido,
          segundoElemento: dia_3_alimento,
        },
      };
    }
  } else if (dias === 4) {
    dia_1_liquido = liquidos[cromosoma[0][0]];
    dia_1_alimento = alimentos[cromosoma[0][1]];
    dia_2_liquido = liquidos[cromosoma[1][0]];
    dia_2_alimento = alimentos[cromosoma[1][1]];
    dia_3_liquido = liquidos[cromosoma[2][0]];
    dia_3_alimento = alimentos[cromosoma[2][1]];
    dia_4_liquido = liquidos[cromosoma[3][0]];
    dia_4_alimento = alimentos[cromosoma[3][1]];
    const factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia4_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    calculo_calorias = dia_1_liquido.Cals + (dia_1_alimento.Cals * factorCantidadAlimento) + dia_2_liquido.Cals + (dia_2_alimento.Cals * dia2_factorCantidadAlimento) + dia_3_liquido.Cals + (dia_3_alimento.Cals * dia3_factorCantidadAlimento) + dia_4_liquido.Cals + (dia_4_alimento.Cals * dia4_factorCantidadAlimento);
    calculo_proteinas = dia_1_liquido.Prot + dia_1_alimento.Prot + dia_2_liquido.Prot + dia_2_alimento.Prot + dia_3_liquido.Prot + dia_3_alimento.Prot + dia_4_liquido.Prot + dia_4_alimento.Prot;
    if ( calculo_calorias >= (objetivoCaloria-240) && calculo_calorias <= (objetivoCaloria+240)) {
      dia_1_alimento.Cals = dia_1_alimento.Cals * factorCantidadAlimento;
      dia_1_alimento.Prot = dia_1_alimento.Prot * factorCantidadAlimento;
      dia_1_alimento.Grasa = dia_1_alimento.Grasa * factorCantidadAlimento;
      switch (factorCantidadAlimento) {
        case 2:
          dia_1_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_1_alimento.cantidad = "3 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_2_alimento.Cals = dia_2_alimento.Cals * dia2_factorCantidadAlimento;
      dia_2_alimento.Prot = dia_2_alimento.Prot * dia2_factorCantidadAlimento;
      dia_2_alimento.Grasa = dia_2_alimento.Grasa * dia2_factorCantidadAlimento;
      switch (dia2_factorCantidadAlimento) {
        case 2:
          dia_2_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_2_alimento.cantidad = "3 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_3_alimento.Cals = dia_3_alimento.Cals * dia3_factorCantidadAlimento;
      dia_3_alimento.Prot = dia_3_alimento.Prot * dia3_factorCantidadAlimento;
      dia_3_alimento.Grasa = dia_3_alimento.Grasa * dia3_factorCantidadAlimento;
      switch (dia3_factorCantidadAlimento) {
        case 2:
          dia_3_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_3_alimento.cantidad = "3 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_4_alimento.Cals = dia_4_alimento.Cals * dia4_factorCantidadAlimento;
      dia_4_alimento.Prot = dia_4_alimento.Prot * dia4_factorCantidadAlimento;
      dia_4_alimento.Grasa = dia_4_alimento.Grasa * dia4_factorCantidadAlimento;
      switch (dia4_factorCantidadAlimento) {
        case 2:
          dia_4_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_4_alimento.cantidad = "3 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }
      return {
        resultado: true,
        desayuno: {
          primerElemento: dia_1_liquido,
          segundoElemento: dia_1_alimento,
        },
        desayuno2: {
          primerElemento: dia_2_liquido,
          segundoElemento: dia_2_alimento,
        },
        desayuno3: {
          primerElemento: dia_3_liquido,
          segundoElemento: dia_3_alimento,
        },
        desayuno4: {
          primerElemento: dia_4_liquido,
          segundoElemento: dia_4_alimento,
        },
      };
    } else {
      return {
        resultado: false,
        desayuno: {
          primerElemento: dia_1_liquido,
          segundoElemento: dia_1_alimento,
        },
        desayuno2: {
          primerElemento: dia_2_liquido,
          segundoElemento: dia_2_alimento,
        },
        desayuno3: {
          primerElemento: dia_3_liquido,
          segundoElemento: dia_3_alimento,
        },
        desayuno4: {
          primerElemento: dia_4_liquido,
          segundoElemento: dia_4_alimento,
        },
      };
    }
  } else if (dias === 5) {
    dia_1_liquido = liquidos[cromosoma[0][0]];
    dia_1_alimento = alimentos[cromosoma[0][1]];
    dia_2_liquido = liquidos[cromosoma[1][0]];
    dia_2_alimento = alimentos[cromosoma[1][1]];
    dia_3_liquido = liquidos[cromosoma[2][0]];
    dia_3_alimento = alimentos[cromosoma[2][1]];
    dia_4_liquido = liquidos[cromosoma[3][0]];
    dia_4_alimento = alimentos[cromosoma[3][1]];
    dia_5_liquido = liquidos[cromosoma[4][0]];
    dia_5_alimento = alimentos[cromosoma[4][1]];
    const factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia4_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia5_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    calculo_calorias = dia_1_liquido.Cals + (dia_1_alimento.Cals * factorCantidadAlimento) + dia_2_liquido.Cals + (dia_2_alimento.Cals * dia2_factorCantidadAlimento) + dia_3_liquido.Cals + (dia_3_alimento.Cals * dia3_factorCantidadAlimento) + dia_4_liquido.Cals + (dia_4_alimento.Cals * dia4_factorCantidadAlimento) + dia_5_liquido.Cals + (dia_5_alimento.Cals * dia5_factorCantidadAlimento);
    calculo_proteinas = dia_1_liquido.Prot + dia_1_alimento.Prot + dia_2_liquido.Prot + dia_2_alimento.Prot + dia_3_liquido.Prot + dia_3_alimento.Prot + dia_4_liquido.Prot + dia_4_alimento.Prot + dia_5_liquido.Prot + dia_5_alimento.Prot;
    if ( calculo_calorias >= (objetivoCaloria-300) && calculo_calorias <= (objetivoCaloria+300)) {
      dia_1_alimento.Cals = dia_1_alimento.Cals * factorCantidadAlimento;
      dia_1_alimento.Prot = dia_1_alimento.Prot * factorCantidadAlimento;
      dia_1_alimento.Grasa = dia_1_alimento.Grasa * factorCantidadAlimento;
      switch (factorCantidadAlimento) {
        case 2:
          dia_1_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_1_alimento.cantidad = "3 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_2_alimento.Cals = dia_2_alimento.Cals * dia2_factorCantidadAlimento;
      dia_2_alimento.Prot = dia_2_alimento.Prot * dia2_factorCantidadAlimento;
      dia_2_alimento.Grasa = dia_2_alimento.Grasa * dia2_factorCantidadAlimento;
      switch (dia2_factorCantidadAlimento) {
        case 2:
          dia_2_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_2_alimento.cantidad = "3 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_3_alimento.Cals = dia_3_alimento.Cals * dia3_factorCantidadAlimento;
      dia_3_alimento.Prot = dia_3_alimento.Prot * dia3_factorCantidadAlimento;
      dia_3_alimento.Grasa = dia_3_alimento.Grasa * dia3_factorCantidadAlimento;
      switch (dia3_factorCantidadAlimento) {
        case 2:
          dia_3_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_3_alimento.cantidad = "3 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_4_alimento.Cals = dia_4_alimento.Cals * dia4_factorCantidadAlimento;
      dia_4_alimento.Prot = dia_4_alimento.Prot * dia4_factorCantidadAlimento;
      dia_4_alimento.Grasa = dia_4_alimento.Grasa * dia4_factorCantidadAlimento;
      switch (dia4_factorCantidadAlimento) {
        case 2:
          dia_4_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_4_alimento.cantidad = "3 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_5_alimento.Cals = dia_5_alimento.Cals * dia5_factorCantidadAlimento;
      dia_5_alimento.Prot = dia_5_alimento.Prot * dia5_factorCantidadAlimento;
      dia_5_alimento.Grasa = dia_5_alimento.Grasa * dia5_factorCantidadAlimento;
      switch (dia5_factorCantidadAlimento) {
        case 2:
          dia_5_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_5_alimento.cantidad = "3 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }
      return {
        resultado: true,
        desayuno: {
          primerElemento: dia_1_liquido,
          segundoElemento: dia_1_alimento,
        },
        desayuno2: {
          primerElemento: dia_2_liquido,
          segundoElemento: dia_2_alimento,
        },
        desayuno3: {
          primerElemento: dia_3_liquido,
          segundoElemento: dia_3_alimento,
        },
        desayuno4: {
          primerElemento: dia_4_liquido,
          segundoElemento: dia_4_alimento,
        },
        desayuno5: {
          primerElemento: dia_5_liquido,
          segundoElemento: dia_5_alimento,
        },
      };
    } else {
      return {
        resultado: false,
        desayuno: {
          primerElemento: dia_1_liquido,
          segundoElemento: dia_1_alimento,
        },
        desayuno2: {
          primerElemento: dia_2_liquido,
          segundoElemento: dia_2_alimento,
        },
        desayuno3: {
          primerElemento: dia_3_liquido,
          segundoElemento: dia_3_alimento,
        },
        desayuno4: {
          primerElemento: dia_4_liquido,
          segundoElemento: dia_4_alimento,
        },
        desayuno5: {
          primerElemento: dia_5_liquido,
          segundoElemento: dia_5_alimento,
        },
      };
    }
  } else if (dias === 6) {
    dia_1_liquido = liquidos[cromosoma[0][0]];
    dia_1_alimento = alimentos[cromosoma[0][1]];
    dia_2_liquido = liquidos[cromosoma[1][0]];
    dia_2_alimento = alimentos[cromosoma[1][1]];
    dia_3_liquido = liquidos[cromosoma[2][0]];
    dia_3_alimento = alimentos[cromosoma[2][1]];
    dia_4_liquido = liquidos[cromosoma[3][0]];
    dia_4_alimento = alimentos[cromosoma[3][1]];
    dia_5_liquido = liquidos[cromosoma[4][0]];
    dia_5_alimento = alimentos[cromosoma[4][1]];
    dia_6_liquido = liquidos[cromosoma[5][0]];
    dia_6_alimento = alimentos[cromosoma[5][1]];
    const factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia4_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia5_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia6_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    calculo_calorias = dia_1_liquido.Cals + (dia_1_alimento.Cals * factorCantidadAlimento) + dia_2_liquido.Cals + (dia_2_alimento.Cals * dia2_factorCantidadAlimento) + dia_3_liquido.Cals + (dia_3_alimento.Cals * dia3_factorCantidadAlimento) + dia_4_liquido.Cals + (dia_4_alimento.Cals * dia4_factorCantidadAlimento) + dia_5_liquido.Cals + (dia_5_alimento.Cals * dia5_factorCantidadAlimento) + dia_6_liquido.Cals + (dia_6_alimento.Cals * dia6_factorCantidadAlimento);
    calculo_proteinas = dia_1_liquido.Prot + dia_1_alimento.Prot + dia_2_liquido.Prot + dia_2_alimento.Prot + dia_3_liquido.Prot + dia_3_alimento.Prot + dia_4_liquido.Prot + dia_4_alimento.Prot + dia_5_liquido.Prot + dia_5_alimento.Prot + dia_6_liquido.Prot + dia_6_alimento.Prot;
    if ( calculo_calorias >= (objetivoCaloria-360) && calculo_calorias <= (objetivoCaloria+360)) {
      dia_1_alimento.Cals = dia_1_alimento.Cals * factorCantidadAlimento;
      dia_1_alimento.Prot = dia_1_alimento.Prot * factorCantidadAlimento;
      dia_1_alimento.Grasa = dia_1_alimento.Grasa * factorCantidadAlimento;
      switch (factorCantidadAlimento) {
        case 2:
          dia_1_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_1_alimento.cantidad = "3 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_2_alimento.Cals = dia_2_alimento.Cals * dia2_factorCantidadAlimento;
      dia_2_alimento.Prot = dia_2_alimento.Prot * dia2_factorCantidadAlimento;
      dia_2_alimento.Grasa = dia_2_alimento.Grasa * dia2_factorCantidadAlimento;
      switch (dia2_factorCantidadAlimento) {
        case 2:
          dia_2_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_2_alimento.cantidad = "3 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_3_alimento.Cals = dia_3_alimento.Cals * dia3_factorCantidadAlimento;
      dia_3_alimento.Prot = dia_3_alimento.Prot * dia3_factorCantidadAlimento;
      dia_3_alimento.Grasa = dia_3_alimento.Grasa * dia3_factorCantidadAlimento;
      switch (dia3_factorCantidadAlimento) {
        case 2:
          dia_3_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_3_alimento.cantidad = "3 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_4_alimento.Cals = dia_4_alimento.Cals * dia4_factorCantidadAlimento;
      dia_4_alimento.Prot = dia_4_alimento.Prot * dia4_factorCantidadAlimento;
      dia_4_alimento.Grasa = dia_4_alimento.Grasa * dia4_factorCantidadAlimento;
      switch (dia4_factorCantidadAlimento) {
        case 2:
          dia_4_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_4_alimento.cantidad = "3 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_5_alimento.Cals = dia_5_alimento.Cals * dia5_factorCantidadAlimento;
      dia_5_alimento.Prot = dia_5_alimento.Prot * dia5_factorCantidadAlimento;
      dia_5_alimento.Grasa = dia_5_alimento.Grasa * dia5_factorCantidadAlimento;
      switch (dia5_factorCantidadAlimento) {
        case 2:
          dia_5_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_5_alimento.cantidad = "3 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_6_alimento.Cals = dia_6_alimento.Cals * dia6_factorCantidadAlimento;
      dia_6_alimento.Prot = dia_6_alimento.Prot * dia6_factorCantidadAlimento;
      dia_6_alimento.Grasa = dia_6_alimento.Grasa * dia6_factorCantidadAlimento;
      switch (dia6_factorCantidadAlimento) {
        case 2:
          dia_6_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_6_alimento.cantidad = "3 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }
      return {
        resultado: true,
        desayuno: {
          primerElemento: dia_1_liquido,
          segundoElemento: dia_1_alimento,
        },
        desayuno2: {
          primerElemento: dia_2_liquido,
          segundoElemento: dia_2_alimento,
        },
        desayuno3: {
          primerElemento: dia_3_liquido,
          segundoElemento: dia_3_alimento,
        },
        desayuno4: {
          primerElemento: dia_4_liquido,
          segundoElemento: dia_4_alimento,
        },
        desayuno5: {
          primerElemento: dia_5_liquido,
          segundoElemento: dia_5_alimento,
        },
        desayuno6: {
          primerElemento: dia_6_liquido,
          segundoElemento: dia_6_alimento,
        },
      };
    } else {
      return {
        resultado: false,
        desayuno: {
          primerElemento: dia_1_liquido,
          segundoElemento: dia_1_alimento,
        },
        desayuno2: {
          primerElemento: dia_2_liquido,
          segundoElemento: dia_2_alimento,
        },
        desayuno3: {
          primerElemento: dia_3_liquido,
          segundoElemento: dia_3_alimento,
        },
        desayuno4: {
          primerElemento: dia_4_liquido,
          segundoElemento: dia_4_alimento,
        },
        desayuno5: {
          primerElemento: dia_5_liquido,
          segundoElemento: dia_5_alimento,
        },
        desayuno6: {
          primerElemento: dia_6_liquido,
          segundoElemento: dia_6_alimento,
        },
      };
    }
  } else if (dias === 7) {
    dia_1_liquido = liquidos[cromosoma[0][0]];
    dia_1_alimento = alimentos[cromosoma[0][1]];
    dia_2_liquido = liquidos[cromosoma[1][0]];
    dia_2_alimento = alimentos[cromosoma[1][1]];
    dia_3_liquido = liquidos[cromosoma[2][0]];
    dia_3_alimento = alimentos[cromosoma[2][1]];
    dia_4_liquido = liquidos[cromosoma[3][0]];
    dia_4_alimento = alimentos[cromosoma[3][1]];
    dia_5_liquido = liquidos[cromosoma[4][0]];
    dia_5_alimento = alimentos[cromosoma[4][1]];
    dia_6_liquido = liquidos[cromosoma[5][0]];
    dia_6_alimento = alimentos[cromosoma[5][1]];
    dia_7_liquido = liquidos[cromosoma[6][0]];
    dia_7_alimento = alimentos[cromosoma[6][1]];
    const factorCantidadAlimento = Math.floor(Math.random() * 4) + 1;
    const dia2_factorCantidadAlimento = Math.floor(Math.random() * 4) + 1;
    const dia3_factorCantidadAlimento = Math.floor(Math.random() * 4) + 1;
    const dia4_factorCantidadAlimento = Math.floor(Math.random() * 4) + 1;
    const dia5_factorCantidadAlimento = Math.floor(Math.random() * 4) + 1;
    const dia6_factorCantidadAlimento = Math.floor(Math.random() * 4) + 1;
    const dia7_factorCantidadAlimento = Math.floor(Math.random() * 4) + 1;
    calculo_calorias = dia_1_liquido.Cals + (dia_1_alimento.Cals * factorCantidadAlimento) + dia_2_liquido.Cals + (dia_2_alimento.Cals * dia2_factorCantidadAlimento) + dia_3_liquido.Cals + (dia_3_alimento.Cals * dia3_factorCantidadAlimento) + dia_4_liquido.Cals + (dia_4_alimento.Cals * dia4_factorCantidadAlimento) + dia_5_liquido.Cals + (dia_5_alimento.Cals * dia5_factorCantidadAlimento) + dia_6_liquido.Cals + (dia_6_alimento.Cals * dia6_factorCantidadAlimento) + dia_7_liquido.Cals + (dia_7_alimento.Cals * dia7_factorCantidadAlimento);
    calculo_proteinas = dia_1_liquido.Prot + dia_1_alimento.Prot + dia_2_liquido.Prot + dia_2_alimento.Prot + dia_3_liquido.Prot + dia_3_alimento.Prot + dia_4_liquido.Prot + dia_4_alimento.Prot + dia_5_liquido.Prot + dia_5_alimento.Prot + dia_6_liquido.Prot + dia_6_alimento.Prot + dia_7_liquido.Prot + dia_7_alimento.Prot;
    if ( calculo_calorias >= (objetivoCaloria-420) && calculo_calorias <= (objetivoCaloria+420)) {
      dia_1_alimento.Cals = dia_1_alimento.Cals * factorCantidadAlimento;
      dia_1_alimento.Prot = dia_1_alimento.Prot * factorCantidadAlimento;
      dia_1_alimento.Grasa = dia_1_alimento.Grasa * factorCantidadAlimento;
      switch (factorCantidadAlimento) {
        case 2:
          dia_1_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_1_alimento.cantidad = "3 unidades";
          break;
        case 4:
          dia_1_alimento.cantidad = "4 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_2_alimento.Cals = dia_2_alimento.Cals * dia2_factorCantidadAlimento;
      dia_2_alimento.Prot = dia_2_alimento.Prot * dia2_factorCantidadAlimento;
      dia_2_alimento.Grasa = dia_2_alimento.Grasa * dia2_factorCantidadAlimento;
      switch (dia2_factorCantidadAlimento) {
        case 2:
          dia_2_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_2_alimento.cantidad = "3 unidades";
          break;
        case 4:
          dia_2_alimento.cantidad = "4 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_3_alimento.Cals = dia_3_alimento.Cals * dia3_factorCantidadAlimento;
      dia_3_alimento.Prot = dia_3_alimento.Prot * dia3_factorCantidadAlimento;
      dia_3_alimento.Grasa = dia_3_alimento.Grasa * dia3_factorCantidadAlimento;
      switch (dia3_factorCantidadAlimento) {
        case 2:
          dia_3_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_3_alimento.cantidad = "3 unidades";
          break;
        case 4:
          dia_3_alimento.cantidad = "4 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_4_alimento.Cals = dia_4_alimento.Cals * dia4_factorCantidadAlimento;
      dia_4_alimento.Prot = dia_4_alimento.Prot * dia4_factorCantidadAlimento;
      dia_4_alimento.Grasa = dia_4_alimento.Grasa * dia4_factorCantidadAlimento;
      switch (dia4_factorCantidadAlimento) {
        case 2:
          dia_4_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_4_alimento.cantidad = "3 unidades";
          break;
        case 4:
          dia_4_alimento.cantidad = "4 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_5_alimento.Cals = dia_5_alimento.Cals * dia5_factorCantidadAlimento;
      dia_5_alimento.Prot = dia_5_alimento.Prot * dia5_factorCantidadAlimento;
      dia_5_alimento.Grasa = dia_5_alimento.Grasa * dia5_factorCantidadAlimento;
      switch (dia5_factorCantidadAlimento) {
        case 2:
          dia_5_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_5_alimento.cantidad = "3 unidades";
          break;
        case 4:
          dia_5_alimento.cantidad = "4 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_6_alimento.Cals = dia_6_alimento.Cals * dia6_factorCantidadAlimento;
      dia_6_alimento.Prot = dia_6_alimento.Prot * dia6_factorCantidadAlimento;
      dia_6_alimento.Grasa = dia_6_alimento.Grasa * dia6_factorCantidadAlimento;
      switch (dia6_factorCantidadAlimento) {
        case 2:
          dia_6_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_6_alimento.cantidad = "3 unidades";
          break;
        case 4:
          dia_6_alimento.cantidad = "4 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_7_alimento.Cals = dia_7_alimento.Cals * dia7_factorCantidadAlimento;
      dia_7_alimento.Prot = dia_7_alimento.Prot * dia7_factorCantidadAlimento;
      dia_7_alimento.Grasa = dia_7_alimento.Grasa * dia7_factorCantidadAlimento;
      switch (dia7_factorCantidadAlimento) {
        case 2:
          dia_7_alimento.cantidad = "2 unidades";
          break;
        case 3:
          dia_7_alimento.cantidad = "3 unidades";
          break;
        case 4:
          dia_7_alimento.cantidad = "4 unidades";
          break;
        default:
          console.log("la unidad es 1");
      }
      return {
        resultado: true,
        desayuno: {
          primerElemento: dia_1_liquido,
          segundoElemento: dia_1_alimento,
        },
        desayuno2: {
          primerElemento: dia_2_liquido,
          segundoElemento: dia_2_alimento,
        },
        desayuno3: {
          primerElemento: dia_3_liquido,
          segundoElemento: dia_3_alimento,
        },
        desayuno4: {
          primerElemento: dia_4_liquido,
          segundoElemento: dia_4_alimento,
        },
        desayuno5: {
          primerElemento: dia_5_liquido,
          segundoElemento: dia_5_alimento,
        },
        desayuno6: {
          primerElemento: dia_6_liquido,
          segundoElemento: dia_6_alimento,
        },
        desayuno7: {
          primerElemento: dia_7_liquido,
          segundoElemento: dia_7_alimento,
        },
      };
    } else {
      return {
        resultado: false,
        desayuno: {
          primerElemento: dia_1_liquido,
          segundoElemento: dia_1_alimento,
        },
        desayuno2: {
          primerElemento: dia_2_liquido,
          segundoElemento: dia_2_alimento,
        },
        desayuno3: {
          primerElemento: dia_3_liquido,
          segundoElemento: dia_3_alimento,
        },
        desayuno4: {
          primerElemento: dia_4_liquido,
          segundoElemento: dia_4_alimento,
        },
        desayuno5: {
          primerElemento: dia_5_liquido,
          segundoElemento: dia_5_alimento,
        },
        desayuno6: {
          primerElemento: dia_6_liquido,
          segundoElemento: dia_6_alimento,
        },
        desayuno7: {
          primerElemento: dia_7_liquido,
          segundoElemento: dia_7_alimento,
        },
      };
    }
  }
};

const funcionFitnesAlmuerzo = (cromosoma, carnes, alimentos, objetivoCaloria, ObjetivoProteina, dias) => {
  if (dias === 1) {
    const factorCantidadCarne = Math.floor(Math.random() * 3) + 1;
    const factorCantidadAlimento1 = Math.floor(Math.random() * 3) + 1;
    const factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const factorCantidadAlimento3 = Math.floor(Math.random() * 3) + 1;
    const dia_1_carnes = carnes[cromosoma[0]];
    const dia_1_alimento1 = alimentos[cromosoma[1]];
    const dia_1_alimento2 = alimentos[cromosoma[2]];
    const dia_1_alimento3 = alimentos[cromosoma[3]];
    const calculo_calorias = (dia_1_carnes.Cals * factorCantidadCarne) + (dia_1_alimento1.Cals * factorCantidadAlimento1) + (dia_1_alimento2.Cals * factorCantidadAlimento2) + (dia_1_alimento3.Cals * factorCantidadAlimento3);
    const calculo_proteinas = (dia_1_carnes.Prot * factorCantidadCarne) + (dia_1_alimento1.Prot * factorCantidadAlimento1) + (dia_1_alimento2.Prot * factorCantidadAlimento2) + (dia_1_alimento3.Prot * factorCantidadAlimento3);
    if ( calculo_calorias >= (objetivoCaloria-60) && calculo_calorias <= (objetivoCaloria+60)) {
      dia_1_carnes.Cals = dia_1_carnes.Cals * factorCantidadCarne;
      dia_1_carnes.Prot = dia_1_carnes.Prot * factorCantidadCarne;
      dia_1_carnes.Grasa = dia_1_carnes.Grasa * factorCantidadCarne;
      switch (factorCantidadCarne) {
        case 2:
          dia_1_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_1_carnes.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento1.Cals = dia_1_alimento1.Cals * factorCantidadAlimento1;
      dia_1_alimento1.Prot = dia_1_alimento1.Prot * factorCantidadAlimento1;
      dia_1_alimento1.Grasa = dia_1_alimento1.Grasa * factorCantidadAlimento1;
      switch (factorCantidadAlimento1) {
        case 2:
          dia_1_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento1.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento2.Cals = dia_1_alimento2.Cals * factorCantidadAlimento2;
      dia_1_alimento2.Prot = dia_1_alimento2.Prot * factorCantidadAlimento2;
      dia_1_alimento2.Grasa = dia_1_alimento2.Grasa * factorCantidadAlimento2;
      switch (factorCantidadAlimento2) {
        case 2:
          dia_1_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento3.Cals = dia_1_alimento3.Cals * factorCantidadAlimento3;
      dia_1_alimento3.Prot = dia_1_alimento3.Prot * factorCantidadAlimento3;
      dia_1_alimento3.Grasa = dia_1_alimento3.Grasa * factorCantidadAlimento3;
      switch (factorCantidadAlimento3) {
        case 2:
          dia_1_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento3.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      return {
        resultado: true,
        almuerzo: {
          primerElemento: dia_1_carnes,
          segundoElemento: dia_1_alimento1,
          tercerElemento: dia_1_alimento2,
          cuartoElemento: dia_1_alimento3,
        },
      };
    } else {
      return {
        resultado: false,
        almuerzo: {
          primerElemento: dia_1_carnes,
          segundoElemento: dia_1_alimento1,
          tercerElemento: dia_1_alimento2,
          cuartoElemento: dia_1_alimento3,
        },
      };
    }
  } else if (dias === 2) {
    const dia_1_carnes = carnes[cromosoma[0][0]];
    const dia_1_alimento1 = alimentos[cromosoma[0][1]];
    const dia_1_alimento2 = alimentos[cromosoma[0][2]];
    const dia_1_alimento3 = alimentos[cromosoma[0][3]];
    const dia_2_carnes = carnes[cromosoma[1][0]];
    const dia_2_alimento1 = alimentos[cromosoma[1][1]];
    const dia_2_alimento2 = alimentos[cromosoma[1][2]];
    const dia_2_alimento3 = alimentos[cromosoma[1][3]];
    const factorCantidadCarne = Math.floor(Math.random() * 3) + 1;
    const factorCantidadAlimento1 = Math.floor(Math.random() * 3) + 1;
    const factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const factorCantidadAlimento3 = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadCarne = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento1 = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento3 = Math.floor(Math.random() * 3) + 1;
    const calculo_calorias = (dia_1_carnes.Cals * factorCantidadCarne) + (dia_1_alimento1.Cals * factorCantidadAlimento1) + (dia_1_alimento2.Cals * factorCantidadAlimento2) + (dia_1_alimento3.Cals * factorCantidadAlimento3) + (dia_2_carnes.Cals * dia2_factorCantidadCarne) + (dia_2_alimento1.Cals * dia2_factorCantidadAlimento1) + (dia_2_alimento2.Cals * dia2_factorCantidadAlimento2) + (dia_2_alimento3.Cals * dia2_factorCantidadAlimento3);
    const calculo_proteinas = dia_1_carnes.Prot + dia_1_alimento1.Prot + dia_1_alimento2.Prot + dia_1_alimento3.Prot + dia_2_carnes.Prot + dia_2_alimento1.Prot + dia_2_alimento2.Prot + dia_2_alimento3.Prot;
    if ( calculo_calorias >= (objetivoCaloria-120) && calculo_calorias <= (objetivoCaloria+120)) {
      dia_1_carnes.Cals = dia_1_carnes.Cals * factorCantidadCarne;
      dia_1_carnes.Prot = dia_1_carnes.Prot * factorCantidadCarne;
      dia_1_carnes.Grasa = dia_1_carnes.Grasa * factorCantidadCarne;
      switch (factorCantidadCarne) {
        case 2:
          dia_1_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_1_carnes.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento1.Cals = dia_1_alimento1.Cals * factorCantidadAlimento1;
      dia_1_alimento1.Prot = dia_1_alimento1.Prot * factorCantidadAlimento1;
      dia_1_alimento1.Grasa = dia_1_alimento1.Grasa * factorCantidadAlimento1;
      switch (factorCantidadAlimento1) {
        case 2:
          dia_1_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento1.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento2.Cals = dia_1_alimento2.Cals * factorCantidadAlimento2;
      dia_1_alimento2.Prot = dia_1_alimento2.Prot * factorCantidadAlimento2;
      dia_1_alimento2.Grasa = dia_1_alimento2.Grasa * factorCantidadAlimento2;
      switch (factorCantidadAlimento2) {
        case 2:
          dia_1_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento3.Cals = dia_1_alimento3.Cals * factorCantidadAlimento3;
      dia_1_alimento3.Prot = dia_1_alimento3.Prot * factorCantidadAlimento3;
      dia_1_alimento3.Grasa = dia_1_alimento3.Grasa * factorCantidadAlimento3;
      switch (factorCantidadAlimento3) {
        case 2:
          dia_1_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento3.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_2_carnes.Cals = dia_2_carnes.Cals * dia2_factorCantidadCarne;
      dia_2_carnes.Prot = dia_2_carnes.Prot * dia2_factorCantidadCarne;
      dia_2_carnes.Grasa = dia_2_carnes.Grasa * dia2_factorCantidadCarne;
      switch (dia2_factorCantidadCarne) {
        case 2:
          dia_2_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_2_carnes.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_2_alimento1.Cals = dia_2_alimento1.Cals * dia2_factorCantidadAlimento1;
      dia_2_alimento1.Prot = dia_2_alimento1.Prot * dia2_factorCantidadAlimento1;
      dia_2_alimento1.Grasa = dia_2_alimento1.Grasa * dia2_factorCantidadAlimento1;
      switch (dia2_factorCantidadAlimento1) {
        case 2:
          dia_2_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento1.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_2_alimento2.Cals = dia_2_alimento2.Cals * dia2_factorCantidadAlimento2;
      dia_2_alimento2.Prot = dia_2_alimento2.Prot * dia2_factorCantidadAlimento2;
      dia_2_alimento2.Grasa = dia_2_alimento2.Grasa * dia2_factorCantidadAlimento2;
      switch (dia2_factorCantidadAlimento2) {
        case 2:
          dia_2_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_2_alimento3.Cals = dia_2_alimento3.Cals * dia2_factorCantidadAlimento3;
      dia_2_alimento3.Prot = dia_2_alimento3.Prot * dia2_factorCantidadAlimento3;
      dia_2_alimento3.Grasa = dia_2_alimento3.Grasa * dia2_factorCantidadAlimento3;
      switch (dia2_factorCantidadAlimento3) {
        case 2:
          dia_2_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento3.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      return {
        resultado: true,
        almuerzo: {
          primerElemento: dia_1_carnes,
          segundoElemento: dia_1_alimento1,
          tercerElemento: dia_1_alimento2,
          cuartoElemento: dia_1_alimento3,
        },
        almuerzo2: {
          primerElemento: dia_2_carnes,
          segundoElemento: dia_2_alimento1,
          tercerElemento: dia_2_alimento2,
          cuartoElemento: dia_2_alimento3,
        },
      };
    } else {
      return {
        resultado: false,
        almuerzo: {
          primerElemento: dia_1_carnes,
          segundoElemento: dia_1_alimento1,
          tercerElemento: dia_1_alimento2,
          cuartoElemento: dia_1_alimento3,
        },
        almuerzo2: {
          primerElemento: dia_2_carnes,
          segundoElemento: dia_2_alimento1,
          tercerElemento: dia_2_alimento2,
          cuartoElemento: dia_2_alimento3,
        },
      };
    }
  } else if (dias === 3) {
    const dia_1_carnes = carnes[cromosoma[0][0]];
    const dia_1_alimento1 = alimentos[cromosoma[0][1]];
    const dia_1_alimento2 = alimentos[cromosoma[0][2]];
    const dia_1_alimento3 = alimentos[cromosoma[0][3]];
    const dia_2_carnes = carnes[cromosoma[1][0]];
    const dia_2_alimento1 = alimentos[cromosoma[1][1]];
    const dia_2_alimento2 = alimentos[cromosoma[1][2]];
    const dia_2_alimento3 = alimentos[cromosoma[1][3]];
    const dia_3_carnes = carnes[cromosoma[2][0]];
    const dia_3_alimento1 = alimentos[cromosoma[2][1]];
    const dia_3_alimento2 = alimentos[cromosoma[2][2]];
    const dia_3_alimento3 = alimentos[cromosoma[2][3]];
    const factorCantidadCarne = Math.floor(Math.random() * 3) + 1;
    const factorCantidadAlimento1 = Math.floor(Math.random() * 3) + 1;
    const factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const factorCantidadAlimento3 = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadCarne = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento1 = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento3 = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadCarne = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadAlimento1 = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadAlimento3 = Math.floor(Math.random() * 3) + 1;
    const calculo_calorias = (dia_1_carnes.Cals * factorCantidadCarne) + (dia_1_alimento1.Cals * factorCantidadAlimento1) + (dia_1_alimento2.Cals * factorCantidadAlimento2) + (dia_1_alimento3.Cals * factorCantidadAlimento3) + (dia_2_carnes.Cals * dia2_factorCantidadCarne) + (dia_2_alimento1.Cals * dia2_factorCantidadAlimento1) + (dia_2_alimento2.Cals * dia2_factorCantidadAlimento2) + (dia_2_alimento3.Cals * dia2_factorCantidadAlimento3) + (dia_3_carnes.Cals * dia3_factorCantidadCarne) + (dia_3_alimento1.Cals * dia3_factorCantidadAlimento1) + (dia_3_alimento2.Cals * dia3_factorCantidadAlimento2) + (dia_3_alimento3.Cals * dia3_factorCantidadAlimento3);
    const calculo_proteinas = dia_1_carnes.Prot + dia_1_alimento1.Prot + dia_1_alimento2.Prot + dia_1_alimento3.Prot + dia_2_carnes.Prot + dia_2_alimento1.Prot + dia_2_alimento2.Prot + dia_2_alimento3.Prot + dia_3_carnes.Prot + dia_3_alimento1.Prot + dia_3_alimento2.Prot + dia_3_alimento3.Prot;
    if ( calculo_calorias >= (objetivoCaloria-180) && calculo_calorias <= (objetivoCaloria+180)) {
      dia_1_carnes.Cals = dia_1_carnes.Cals * factorCantidadCarne;
      dia_1_carnes.Prot = dia_1_carnes.Prot * factorCantidadCarne;
      dia_1_carnes.Grasa = dia_1_carnes.Grasa * factorCantidadCarne;
      switch (factorCantidadCarne) {
        case 2:
          dia_1_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_1_carnes.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento1.Cals = dia_1_alimento1.Cals * factorCantidadAlimento1;
      dia_1_alimento1.Prot = dia_1_alimento1.Prot * factorCantidadAlimento1;
      dia_1_alimento1.Grasa = dia_1_alimento1.Grasa * factorCantidadAlimento1;
      switch (factorCantidadAlimento1) {
        case 2:
          dia_1_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento1.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento2.Cals = dia_1_alimento2.Cals * factorCantidadAlimento2;
      dia_1_alimento2.Prot = dia_1_alimento2.Prot * factorCantidadAlimento2;
      dia_1_alimento2.Grasa = dia_1_alimento2.Grasa * factorCantidadAlimento2;
      switch (factorCantidadAlimento2) {
        case 2:
          dia_1_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento3.Cals = dia_1_alimento3.Cals * factorCantidadAlimento3;
      dia_1_alimento3.Prot = dia_1_alimento3.Prot * factorCantidadAlimento3;
      dia_1_alimento3.Grasa = dia_1_alimento3.Grasa * factorCantidadAlimento3;
      switch (factorCantidadAlimento3) {
        case 2:
          dia_1_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento3.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_2_carnes.Cals = dia_2_carnes.Cals * dia2_factorCantidadCarne;
      dia_2_carnes.Prot = dia_2_carnes.Prot * dia2_factorCantidadCarne;
      dia_2_carnes.Grasa = dia_2_carnes.Grasa * dia2_factorCantidadCarne;
      switch (dia2_factorCantidadCarne) {
        case 2:
          dia_2_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_2_carnes.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_2_alimento1.Cals = dia_2_alimento1.Cals * dia2_factorCantidadAlimento1;
      dia_2_alimento1.Prot = dia_2_alimento1.Prot * dia2_factorCantidadAlimento1;
      dia_2_alimento1.Grasa = dia_2_alimento1.Grasa * dia2_factorCantidadAlimento1;
      switch (dia2_factorCantidadAlimento1) {
        case 2:
          dia_2_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento1.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_2_alimento2.Cals = dia_2_alimento2.Cals * dia2_factorCantidadAlimento2;
      dia_2_alimento2.Prot = dia_2_alimento2.Prot * dia2_factorCantidadAlimento2;
      dia_2_alimento2.Grasa = dia_2_alimento2.Grasa * dia2_factorCantidadAlimento2;
      switch (dia2_factorCantidadAlimento2) {
        case 2:
          dia_2_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_2_alimento3.Cals = dia_2_alimento3.Cals * dia2_factorCantidadAlimento3;
      dia_2_alimento3.Prot = dia_2_alimento3.Prot * dia2_factorCantidadAlimento3;
      dia_2_alimento3.Grasa = dia_2_alimento3.Grasa * dia2_factorCantidadAlimento3;
      switch (dia2_factorCantidadAlimento3) {
        case 2:
          dia_2_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento3.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_3_carnes.Cals = dia_3_carnes.Cals * dia3_factorCantidadCarne;
      dia_3_carnes.Prot = dia_3_carnes.Prot * dia3_factorCantidadCarne;
      dia_3_carnes.Grasa = dia_3_carnes.Grasa * dia3_factorCantidadCarne;
      switch (dia3_factorCantidadCarne) {
        case 2:
          dia_3_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_3_carnes.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_3_alimento1.Cals = dia_3_alimento1.Cals * dia3_factorCantidadAlimento1;
      dia_3_alimento1.Prot = dia_3_alimento1.Prot * dia3_factorCantidadAlimento1;
      dia_3_alimento1.Grasa = dia_3_alimento1.Grasa * dia3_factorCantidadAlimento1;
      switch (dia3_factorCantidadAlimento1) {
        case 2:
          dia_3_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_3_alimento1.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_3_alimento2.Cals = dia_3_alimento2.Cals * dia3_factorCantidadAlimento2;
      dia_3_alimento2.Prot = dia_3_alimento2.Prot * dia3_factorCantidadAlimento2;
      dia_3_alimento2.Grasa = dia_3_alimento2.Grasa * dia3_factorCantidadAlimento2;
      switch (dia3_factorCantidadAlimento2) {
        case 2:
          dia_3_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_3_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_3_alimento3.Cals = dia_3_alimento3.Cals * dia3_factorCantidadAlimento3;
      dia_3_alimento3.Prot = dia_3_alimento3.Prot * dia3_factorCantidadAlimento3;
      dia_3_alimento3.Grasa = dia_3_alimento3.Grasa * dia3_factorCantidadAlimento3;
      switch (dia3_factorCantidadAlimento3) {
        case 2:
          dia_3_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_3_alimento3.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      return {
        resultado: true,
        almuerzo: {
          primerElemento: dia_1_carnes,
          segundoElemento: dia_1_alimento1,
          tercerElemento: dia_1_alimento2,
          cuartoElemento: dia_1_alimento3,
        },
        almuerzo2: {
          primerElemento: dia_2_carnes,
          segundoElemento: dia_2_alimento1,
          tercerElemento: dia_2_alimento2,
          cuartoElemento: dia_2_alimento3,
        },
        almuerzo3: {
          primerElemento: dia_3_carnes,
          segundoElemento: dia_3_alimento1,
          tercerElemento: dia_3_alimento2,
          cuartoElemento: dia_3_alimento3,
        },
      };
    } else {
      return {
        resultado: false,
        almuerzo: {
          primerElemento: dia_1_carnes,
          segundoElemento: dia_1_alimento1,
          tercerElemento: dia_1_alimento2,
          cuartoElemento: dia_1_alimento3,
        },
        almuerzo2: {
          primerElemento: dia_2_carnes,
          segundoElemento: dia_2_alimento1,
          tercerElemento: dia_2_alimento2,
          cuartoElemento: dia_2_alimento3,
        },
        almuerzo3: {
          primerElemento: dia_3_carnes,
          segundoElemento: dia_3_alimento1,
          tercerElemento: dia_3_alimento2,
          cuartoElemento: dia_3_alimento3,
        },
      };
    }
  } else if (dias === 4) {
    const dia_1_carnes = carnes[cromosoma[0][0]];
    const dia_1_alimento1 = alimentos[cromosoma[0][1]];
    const dia_1_alimento2 = alimentos[cromosoma[0][2]];
    const dia_1_alimento3 = alimentos[cromosoma[0][3]];
    const dia_2_carnes = carnes[cromosoma[1][0]];
    const dia_2_alimento1 = alimentos[cromosoma[1][1]];
    const dia_2_alimento2 = alimentos[cromosoma[1][2]];
    const dia_2_alimento3 = alimentos[cromosoma[1][3]];
    const dia_3_carnes = carnes[cromosoma[2][0]];
    const dia_3_alimento1 = alimentos[cromosoma[2][1]];
    const dia_3_alimento2 = alimentos[cromosoma[2][2]];
    const dia_3_alimento3 = alimentos[cromosoma[2][3]];
    const dia_4_carnes = carnes[cromosoma[3][0]];
    const dia_4_alimento1 = alimentos[cromosoma[3][1]];
    const dia_4_alimento2 = alimentos[cromosoma[3][2]];
    const dia_4_alimento3 = alimentos[cromosoma[3][3]];
    const factorCantidadCarne = Math.floor(Math.random() * 3) + 1;
    const factorCantidadAlimento1 = Math.floor(Math.random() * 3) + 1;
    const factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const factorCantidadAlimento3 = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadCarne = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento1 = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento3 = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadCarne = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadAlimento1 = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadAlimento3 = Math.floor(Math.random() * 3) + 1;
    const dia4_factorCantidadCarne = Math.floor(Math.random() * 3) + 1;
    const dia4_factorCantidadAlimento1 = Math.floor(Math.random() * 3) + 1;
    const dia4_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia4_factorCantidadAlimento3 = Math.floor(Math.random() * 3) + 1;
    const calculo_calorias = (dia_1_carnes.Cals * factorCantidadCarne) + (dia_1_alimento1.Cals * factorCantidadAlimento1) + (dia_1_alimento2.Cals * factorCantidadAlimento2) + (dia_1_alimento3.Cals * factorCantidadAlimento3) + (dia_2_carnes.Cals * dia2_factorCantidadCarne) + (dia_2_alimento1.Cals * dia2_factorCantidadAlimento1) + (dia_2_alimento2.Cals * dia2_factorCantidadAlimento2) + (dia_2_alimento3.Cals * dia2_factorCantidadAlimento3) + (dia_3_carnes.Cals * dia3_factorCantidadCarne) + (dia_3_alimento1.Cals * dia3_factorCantidadAlimento1) + (dia_3_alimento2.Cals * dia3_factorCantidadAlimento2) + (dia_3_alimento3.Cals * dia3_factorCantidadAlimento3) + (dia_4_carnes.Cals * dia4_factorCantidadCarne) + (dia_4_alimento1.Cals * dia4_factorCantidadAlimento1) + (dia_4_alimento2.Cals * dia4_factorCantidadAlimento2) + (dia_4_alimento3.Cals * dia4_factorCantidadAlimento3);
    const calculo_proteinas = dia_1_carnes.Prot + dia_1_alimento1.Prot + dia_1_alimento2.Prot + dia_1_alimento3.Prot + dia_2_carnes.Prot + dia_2_alimento1.Prot + dia_2_alimento2.Prot + dia_2_alimento3.Prot + dia_3_carnes.Prot + dia_3_alimento1.Prot + dia_3_alimento2.Prot + dia_3_alimento3.Prot + dia_4_carnes.Prot + dia_4_alimento1.Prot + dia_4_alimento2.Prot + dia_4_alimento3.Prot;
    if ( calculo_calorias >= (objetivoCaloria-240) && calculo_calorias <= (objetivoCaloria+240)) {
      dia_1_carnes.Cals = dia_1_carnes.Cals * factorCantidadCarne;
      dia_1_carnes.Prot = dia_1_carnes.Prot * factorCantidadCarne;
      dia_1_carnes.Grasa = dia_1_carnes.Grasa * factorCantidadCarne;
      switch (factorCantidadCarne) {
        case 2:
          dia_1_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_1_carnes.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento1.Cals = dia_1_alimento1.Cals * factorCantidadAlimento1;
      dia_1_alimento1.Prot = dia_1_alimento1.Prot * factorCantidadAlimento1;
      dia_1_alimento1.Grasa = dia_1_alimento1.Grasa * factorCantidadAlimento1;
      switch (factorCantidadAlimento1) {
        case 2:
          dia_1_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento1.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento2.Cals = dia_1_alimento2.Cals * factorCantidadAlimento2;
      dia_1_alimento2.Prot = dia_1_alimento2.Prot * factorCantidadAlimento2;
      dia_1_alimento2.Grasa = dia_1_alimento2.Grasa * factorCantidadAlimento2;
      switch (factorCantidadAlimento2) {
        case 2:
          dia_1_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento3.Cals = dia_1_alimento3.Cals * factorCantidadAlimento3;
      dia_1_alimento3.Prot = dia_1_alimento3.Prot * factorCantidadAlimento3;
      dia_1_alimento3.Grasa = dia_1_alimento3.Grasa * factorCantidadAlimento3;
      switch (factorCantidadAlimento3) {
        case 2:
          dia_1_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento3.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_2_carnes.Cals = dia_2_carnes.Cals * dia2_factorCantidadCarne;
      dia_2_carnes.Prot = dia_2_carnes.Prot * dia2_factorCantidadCarne;
      dia_2_carnes.Grasa = dia_2_carnes.Grasa * dia2_factorCantidadCarne;
      switch (dia2_factorCantidadCarne) {
        case 2:
          dia_2_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_2_carnes.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_2_alimento1.Cals = dia_2_alimento1.Cals * dia2_factorCantidadAlimento1;
      dia_2_alimento1.Prot = dia_2_alimento1.Prot * dia2_factorCantidadAlimento1;
      dia_2_alimento1.Grasa = dia_2_alimento1.Grasa * dia2_factorCantidadAlimento1;
      switch (dia2_factorCantidadAlimento1) {
        case 2:
          dia_2_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento1.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_2_alimento2.Cals = dia_2_alimento2.Cals * dia2_factorCantidadAlimento2;
      dia_2_alimento2.Prot = dia_2_alimento2.Prot * dia2_factorCantidadAlimento2;
      dia_2_alimento2.Grasa = dia_2_alimento2.Grasa * dia2_factorCantidadAlimento2;
      switch (dia2_factorCantidadAlimento2) {
        case 2:
          dia_2_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_2_alimento3.Cals = dia_2_alimento3.Cals * dia2_factorCantidadAlimento3;
      dia_2_alimento3.Prot = dia_2_alimento3.Prot * dia2_factorCantidadAlimento3;
      dia_2_alimento3.Grasa = dia_2_alimento3.Grasa * dia2_factorCantidadAlimento3;
      switch (dia2_factorCantidadAlimento3) {
        case 2:
          dia_2_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento3.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_3_carnes.Cals = dia_3_carnes.Cals * dia3_factorCantidadCarne;
      dia_3_carnes.Prot = dia_3_carnes.Prot * dia3_factorCantidadCarne;
      dia_3_carnes.Grasa = dia_3_carnes.Grasa * dia3_factorCantidadCarne;
      switch (dia3_factorCantidadCarne) {
        case 2:
          dia_3_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_3_carnes.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_3_alimento1.Cals = dia_3_alimento1.Cals * dia3_factorCantidadAlimento1;
      dia_3_alimento1.Prot = dia_3_alimento1.Prot * dia3_factorCantidadAlimento1;
      dia_3_alimento1.Grasa = dia_3_alimento1.Grasa * dia3_factorCantidadAlimento1;
      switch (dia3_factorCantidadAlimento1) {
        case 2:
          dia_3_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_3_alimento1.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_3_alimento2.Cals = dia_3_alimento2.Cals * dia3_factorCantidadAlimento2;
      dia_3_alimento2.Prot = dia_3_alimento2.Prot * dia3_factorCantidadAlimento2;
      dia_3_alimento2.Grasa = dia_3_alimento2.Grasa * dia3_factorCantidadAlimento2;
      switch (dia3_factorCantidadAlimento2) {
        case 2:
          dia_3_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_3_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_3_alimento3.Cals = dia_3_alimento3.Cals * dia3_factorCantidadAlimento3;
      dia_3_alimento3.Prot = dia_3_alimento3.Prot * dia3_factorCantidadAlimento3;
      dia_3_alimento3.Grasa = dia_3_alimento3.Grasa * dia3_factorCantidadAlimento3;
      switch (dia3_factorCantidadAlimento3) {
        case 2:
          dia_3_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_3_alimento3.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_4_carnes.Cals = dia_4_carnes.Cals * dia4_factorCantidadCarne;
      dia_4_carnes.Prot = dia_4_carnes.Prot * dia4_factorCantidadCarne;
      dia_4_carnes.Grasa = dia_4_carnes.Grasa * dia4_factorCantidadCarne;
      switch (dia4_factorCantidadCarne) {
        case 2:
          dia_4_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_4_carnes.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_4_alimento1.Cals = dia_4_alimento1.Cals * dia4_factorCantidadAlimento1;
      dia_4_alimento1.Prot = dia_4_alimento1.Prot * dia4_factorCantidadAlimento1;
      dia_4_alimento1.Grasa = dia_4_alimento1.Grasa * dia4_factorCantidadAlimento1;
      switch (dia4_factorCantidadAlimento1) {
        case 2:
          dia_4_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_4_alimento1.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_4_alimento2.Cals = dia_4_alimento2.Cals * dia4_factorCantidadAlimento2;
      dia_4_alimento2.Prot = dia_4_alimento2.Prot * dia4_factorCantidadAlimento2;
      dia_4_alimento2.Grasa = dia_4_alimento2.Grasa * dia4_factorCantidadAlimento2;
      switch (dia4_factorCantidadAlimento2) {
        case 2:
          dia_4_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_4_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_4_alimento3.Cals = dia_4_alimento3.Cals * dia4_factorCantidadAlimento3;
      dia_4_alimento3.Prot = dia_4_alimento3.Prot * dia4_factorCantidadAlimento3;
      dia_4_alimento3.Grasa = dia_4_alimento3.Grasa * dia4_factorCantidadAlimento3;
      switch (dia4_factorCantidadAlimento3) {
        case 2:
          dia_4_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_4_alimento3.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      return {
        resultado: true,
        almuerzo: {
          primerElemento: dia_1_carnes,
          segundoElemento: dia_1_alimento1,
          tercerElemento: dia_1_alimento2,
          cuartoElemento: dia_1_alimento3,
        },
        almuerzo2: {
          primerElemento: dia_2_carnes,
          segundoElemento: dia_2_alimento1,
          tercerElemento: dia_2_alimento2,
          cuartoElemento: dia_2_alimento3,
        },
        almuerzo3: {
          primerElemento: dia_3_carnes,
          segundoElemento: dia_3_alimento1,
          tercerElemento: dia_3_alimento2,
          cuartoElemento: dia_3_alimento3,
        },
        almuerzo4: {
          primerElemento: dia_4_carnes,
          segundoElemento: dia_4_alimento1,
          tercerElemento: dia_4_alimento2,
          cuartoElemento: dia_4_alimento3,
        },
      };
    } else {
      return {
        resultado: false,
        almuerzo: {
          primerElemento: dia_1_carnes,
          segundoElemento: dia_1_alimento1,
          tercerElemento: dia_1_alimento2,
          cuartoElemento: dia_1_alimento3,
        },
        almuerzo2: {
          primerElemento: dia_2_carnes,
          segundoElemento: dia_2_alimento1,
          tercerElemento: dia_2_alimento2,
          cuartoElemento: dia_2_alimento3,
        },
        almuerzo3: {
          primerElemento: dia_3_carnes,
          segundoElemento: dia_3_alimento1,
          tercerElemento: dia_3_alimento2,
          cuartoElemento: dia_3_alimento3,
        },
        almuerzo4: {
          primerElemento: dia_4_carnes,
          segundoElemento: dia_4_alimento1,
          tercerElemento: dia_4_alimento2,
          cuartoElemento: dia_4_alimento3,
        },
      };
    }
  } else if (dias === 5) {
    const dia_1_carnes = carnes[cromosoma[0][0]];
    const dia_1_alimento1 = alimentos[cromosoma[0][1]];
    const dia_1_alimento2 = alimentos[cromosoma[0][2]];
    const dia_1_alimento3 = alimentos[cromosoma[0][3]];
    const dia_2_carnes = carnes[cromosoma[1][0]];
    const dia_2_alimento1 = alimentos[cromosoma[1][1]];
    const dia_2_alimento2 = alimentos[cromosoma[1][2]];
    const dia_2_alimento3 = alimentos[cromosoma[1][3]];
    const dia_3_carnes = carnes[cromosoma[2][0]];
    const dia_3_alimento1 = alimentos[cromosoma[2][1]];
    const dia_3_alimento2 = alimentos[cromosoma[2][2]];
    const dia_3_alimento3 = alimentos[cromosoma[2][3]];
    const dia_4_carnes = carnes[cromosoma[3][0]];
    const dia_4_alimento1 = alimentos[cromosoma[3][1]];
    const dia_4_alimento2 = alimentos[cromosoma[3][2]];
    const dia_4_alimento3 = alimentos[cromosoma[3][3]];
    const dia_5_carnes = carnes[cromosoma[4][0]];
    const dia_5_alimento1 = alimentos[cromosoma[4][1]];
    const dia_5_alimento2 = alimentos[cromosoma[4][2]];
    const dia_5_alimento3 = alimentos[cromosoma[4][3]];
    const factorCantidadCarne = Math.floor(Math.random() * 3) + 1;
    const factorCantidadAlimento1 = Math.floor(Math.random() * 3) + 1;
    const factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const factorCantidadAlimento3 = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadCarne = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento1 = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento3 = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadCarne = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadAlimento1 = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadAlimento3 = Math.floor(Math.random() * 3) + 1;
    const dia4_factorCantidadCarne = Math.floor(Math.random() * 3) + 1;
    const dia4_factorCantidadAlimento1 = Math.floor(Math.random() * 3) + 1;
    const dia4_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia4_factorCantidadAlimento3 = Math.floor(Math.random() * 3) + 1;
    const dia5_factorCantidadCarne = Math.floor(Math.random() * 3) + 1;
    const dia5_factorCantidadAlimento1 = Math.floor(Math.random() * 3) + 1;
    const dia5_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia5_factorCantidadAlimento3 = Math.floor(Math.random() * 3) + 1;
    const calculo_calorias = (dia_1_carnes.Cals * factorCantidadCarne) + (dia_1_alimento1.Cals * factorCantidadAlimento1) + (dia_1_alimento2.Cals * factorCantidadAlimento2) + (dia_1_alimento3.Cals * factorCantidadAlimento3) + (dia_2_carnes.Cals * dia2_factorCantidadCarne) + (dia_2_alimento1.Cals * dia2_factorCantidadAlimento1) + (dia_2_alimento2.Cals * dia2_factorCantidadAlimento2) + (dia_2_alimento3.Cals * dia2_factorCantidadAlimento3) + (dia_3_carnes.Cals * dia3_factorCantidadCarne) + (dia_3_alimento1.Cals * dia3_factorCantidadAlimento1) + (dia_3_alimento2.Cals * dia3_factorCantidadAlimento2) + (dia_3_alimento3.Cals * dia3_factorCantidadAlimento3) + (dia_4_carnes.Cals * dia4_factorCantidadCarne) + (dia_4_alimento1.Cals * dia4_factorCantidadAlimento1) + (dia_4_alimento2.Cals * dia4_factorCantidadAlimento2) + (dia_4_alimento3.Cals * dia4_factorCantidadAlimento3) + (dia_5_carnes.Cals * dia5_factorCantidadCarne) + (dia_5_alimento1.Cals * dia5_factorCantidadAlimento1) + (dia_5_alimento2.Cals * dia5_factorCantidadAlimento2) + (dia_5_alimento3.Cals * dia5_factorCantidadAlimento3);
    const calculo_proteinas = dia_1_carnes.Prot + dia_1_alimento1.Prot + dia_1_alimento2.Prot + dia_1_alimento3.Prot + dia_2_carnes.Prot + dia_2_alimento1.Prot + dia_2_alimento2.Prot + dia_2_alimento3.Prot + dia_3_carnes.Prot + dia_3_alimento1.Prot + dia_3_alimento2.Prot + dia_3_alimento3.Prot + dia_4_carnes.Prot + dia_4_alimento1.Prot + dia_4_alimento2.Prot + dia_4_alimento3.Prot + dia_5_carnes.Prot + dia_5_alimento1.Prot + dia_5_alimento2.Prot + dia_5_alimento3.Prot;
    if ( calculo_calorias >= (objetivoCaloria-300) && calculo_calorias <= (objetivoCaloria+300)) {
      dia_1_carnes.Cals = dia_1_carnes.Cals * factorCantidadCarne;
      dia_1_carnes.Prot = dia_1_carnes.Prot * factorCantidadCarne;
      dia_1_carnes.Grasa = dia_1_carnes.Grasa * factorCantidadCarne;
      switch (factorCantidadCarne) {
        case 2:
          dia_1_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_1_carnes.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento1.Cals = dia_1_alimento1.Cals * factorCantidadAlimento1;
      dia_1_alimento1.Prot = dia_1_alimento1.Prot * factorCantidadAlimento1;
      dia_1_alimento1.Grasa = dia_1_alimento1.Grasa * factorCantidadAlimento1;
      switch (factorCantidadAlimento1) {
        case 2:
          dia_1_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento1.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento2.Cals = dia_1_alimento2.Cals * factorCantidadAlimento2;
      dia_1_alimento2.Prot = dia_1_alimento2.Prot * factorCantidadAlimento2;
      dia_1_alimento2.Grasa = dia_1_alimento2.Grasa * factorCantidadAlimento2;
      switch (factorCantidadAlimento2) {
        case 2:
          dia_1_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento3.Cals = dia_1_alimento3.Cals * factorCantidadAlimento3;
      dia_1_alimento3.Prot = dia_1_alimento3.Prot * factorCantidadAlimento3;
      dia_1_alimento3.Grasa = dia_1_alimento3.Grasa * factorCantidadAlimento3;
      switch (factorCantidadAlimento3) {
        case 2:
          dia_1_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento3.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_2_carnes.Cals = dia_2_carnes.Cals * dia2_factorCantidadCarne;
      dia_2_carnes.Prot = dia_2_carnes.Prot * dia2_factorCantidadCarne;
      dia_2_carnes.Grasa = dia_2_carnes.Grasa * dia2_factorCantidadCarne;
      switch (dia2_factorCantidadCarne) {
        case 2:
          dia_2_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_2_carnes.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_2_alimento1.Cals = dia_2_alimento1.Cals * dia2_factorCantidadAlimento1;
      dia_2_alimento1.Prot = dia_2_alimento1.Prot * dia2_factorCantidadAlimento1;
      dia_2_alimento1.Grasa = dia_2_alimento1.Grasa * dia2_factorCantidadAlimento1;
      switch (dia2_factorCantidadAlimento1) {
        case 2:
          dia_2_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento1.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_2_alimento2.Cals = dia_2_alimento2.Cals * dia2_factorCantidadAlimento2;
      dia_2_alimento2.Prot = dia_2_alimento2.Prot * dia2_factorCantidadAlimento2;
      dia_2_alimento2.Grasa = dia_2_alimento2.Grasa * dia2_factorCantidadAlimento2;
      switch (dia2_factorCantidadAlimento2) {
        case 2:
          dia_2_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_2_alimento3.Cals = dia_2_alimento3.Cals * dia2_factorCantidadAlimento3;
      dia_2_alimento3.Prot = dia_2_alimento3.Prot * dia2_factorCantidadAlimento3;
      dia_2_alimento3.Grasa = dia_2_alimento3.Grasa * dia2_factorCantidadAlimento3;
      switch (dia2_factorCantidadAlimento3) {
        case 2:
          dia_2_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento3.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_3_carnes.Cals = dia_3_carnes.Cals * dia3_factorCantidadCarne;
      dia_3_carnes.Prot = dia_3_carnes.Prot * dia3_factorCantidadCarne;
      dia_3_carnes.Grasa = dia_3_carnes.Grasa * dia3_factorCantidadCarne;
      switch (dia3_factorCantidadCarne) {
        case 2:
          dia_3_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_3_carnes.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_3_alimento1.Cals = dia_3_alimento1.Cals * dia3_factorCantidadAlimento1;
      dia_3_alimento1.Prot = dia_3_alimento1.Prot * dia3_factorCantidadAlimento1;
      dia_3_alimento1.Grasa = dia_3_alimento1.Grasa * dia3_factorCantidadAlimento1;
      switch (dia3_factorCantidadAlimento1) {
        case 2:
          dia_3_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_3_alimento1.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_3_alimento2.Cals = dia_3_alimento2.Cals * dia3_factorCantidadAlimento2;
      dia_3_alimento2.Prot = dia_3_alimento2.Prot * dia3_factorCantidadAlimento2;
      dia_3_alimento2.Grasa = dia_3_alimento2.Grasa * dia3_factorCantidadAlimento2;
      switch (dia3_factorCantidadAlimento2) {
        case 2:
          dia_3_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_3_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_3_alimento3.Cals = dia_3_alimento3.Cals * dia3_factorCantidadAlimento3;
      dia_3_alimento3.Prot = dia_3_alimento3.Prot * dia3_factorCantidadAlimento3;
      dia_3_alimento3.Grasa = dia_3_alimento3.Grasa * dia3_factorCantidadAlimento3;
      switch (dia3_factorCantidadAlimento3) {
        case 2:
          dia_3_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_3_alimento3.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_4_carnes.Cals = dia_4_carnes.Cals * dia4_factorCantidadCarne;
      dia_4_carnes.Prot = dia_4_carnes.Prot * dia4_factorCantidadCarne;
      dia_4_carnes.Grasa = dia_4_carnes.Grasa * dia4_factorCantidadCarne;
      switch (dia4_factorCantidadCarne) {
        case 2:
          dia_4_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_4_carnes.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_4_alimento1.Cals = dia_4_alimento1.Cals * dia4_factorCantidadAlimento1;
      dia_4_alimento1.Prot = dia_4_alimento1.Prot * dia4_factorCantidadAlimento1;
      dia_4_alimento1.Grasa = dia_4_alimento1.Grasa * dia4_factorCantidadAlimento1;
      switch (dia4_factorCantidadAlimento1) {
        case 2:
          dia_4_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_4_alimento1.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_4_alimento2.Cals = dia_4_alimento2.Cals * dia4_factorCantidadAlimento2;
      dia_4_alimento2.Prot = dia_4_alimento2.Prot * dia4_factorCantidadAlimento2;
      dia_4_alimento2.Grasa = dia_4_alimento2.Grasa * dia4_factorCantidadAlimento2;
      switch (dia4_factorCantidadAlimento2) {
        case 2:
          dia_4_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_4_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_4_alimento3.Cals = dia_4_alimento3.Cals * dia4_factorCantidadAlimento3;
      dia_4_alimento3.Prot = dia_4_alimento3.Prot * dia4_factorCantidadAlimento3;
      dia_4_alimento3.Grasa = dia_4_alimento3.Grasa * dia4_factorCantidadAlimento3;
      switch (dia4_factorCantidadAlimento3) {
        case 2:
          dia_4_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_4_alimento3.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_5_carnes.Cals = dia_5_carnes.Cals * dia5_factorCantidadCarne;
      dia_5_carnes.Prot = dia_5_carnes.Prot * dia5_factorCantidadCarne;
      dia_5_carnes.Grasa = dia_5_carnes.Grasa * dia5_factorCantidadCarne;
      switch (dia5_factorCantidadCarne) {
        case 2:
          dia_5_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_5_carnes.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_5_alimento1.Cals = dia_5_alimento1.Cals * dia5_factorCantidadAlimento1;
      dia_5_alimento1.Prot = dia_5_alimento1.Prot * dia5_factorCantidadAlimento1;
      dia_5_alimento1.Grasa = dia_5_alimento1.Grasa * dia5_factorCantidadAlimento1;
      switch (dia5_factorCantidadAlimento1) {
        case 2:
          dia_5_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_5_alimento1.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_5_alimento2.Cals = dia_5_alimento2.Cals * dia5_factorCantidadAlimento2;
      dia_5_alimento2.Prot = dia_5_alimento2.Prot * dia5_factorCantidadAlimento2;
      dia_5_alimento2.Grasa = dia_5_alimento2.Grasa * dia5_factorCantidadAlimento2;
      switch (dia5_factorCantidadAlimento2) {
        case 2:
          dia_5_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_5_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_5_alimento3.Cals = dia_5_alimento3.Cals * dia5_factorCantidadAlimento3;
      dia_5_alimento3.Prot = dia_5_alimento3.Prot * dia5_factorCantidadAlimento3;
      dia_5_alimento3.Grasa = dia_5_alimento3.Grasa * dia5_factorCantidadAlimento3;
      switch (dia5_factorCantidadAlimento3) {
        case 2:
          dia_5_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_5_alimento3.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      return {
        resultado: true,
        almuerzo: {
          primerElemento: dia_1_carnes,
          segundoElemento: dia_1_alimento1,
          tercerElemento: dia_1_alimento2,
          cuartoElemento: dia_1_alimento3,
        },
        almuerzo2: {
          primerElemento: dia_2_carnes,
          segundoElemento: dia_2_alimento1,
          tercerElemento: dia_2_alimento2,
          cuartoElemento: dia_2_alimento3,
        },
        almuerzo3: {
          primerElemento: dia_3_carnes,
          segundoElemento: dia_3_alimento1,
          tercerElemento: dia_3_alimento2,
          cuartoElemento: dia_3_alimento3,
        },
        almuerzo4: {
          primerElemento: dia_4_carnes,
          segundoElemento: dia_4_alimento1,
          tercerElemento: dia_4_alimento2,
          cuartoElemento: dia_4_alimento3,
        },
        almuerzo5: {
          primerElemento: dia_5_carnes,
          segundoElemento: dia_5_alimento1,
          tercerElemento: dia_5_alimento2,
          cuartoElemento: dia_5_alimento3,
        },
      };
    } else {
      return {
        resultado: false,
        almuerzo: {
          primerElemento: dia_1_carnes,
          segundoElemento: dia_1_alimento1,
          tercerElemento: dia_1_alimento2,
          cuartoElemento: dia_1_alimento3,
        },
        almuerzo2: {
          primerElemento: dia_2_carnes,
          segundoElemento: dia_2_alimento1,
          tercerElemento: dia_2_alimento2,
          cuartoElemento: dia_2_alimento3,
        },
        almuerzo3: {
          primerElemento: dia_3_carnes,
          segundoElemento: dia_3_alimento1,
          tercerElemento: dia_3_alimento2,
          cuartoElemento: dia_3_alimento3,
        },
        almuerzo4: {
          primerElemento: dia_4_carnes,
          segundoElemento: dia_4_alimento1,
          tercerElemento: dia_4_alimento2,
          cuartoElemento: dia_4_alimento3,
        },
        almuerzo5: {
          primerElemento: dia_5_carnes,
          segundoElemento: dia_5_alimento1,
          tercerElemento: dia_5_alimento2,
          cuartoElemento: dia_5_alimento3,
        },
      };
    }
  } else if (dias === 6) {
    const dia_1_carnes = carnes[cromosoma[0][0]];
    const dia_1_alimento1 = alimentos[cromosoma[0][1]];
    const dia_1_alimento2 = alimentos[cromosoma[0][2]];
    const dia_1_alimento3 = alimentos[cromosoma[0][3]];
    const dia_2_carnes = carnes[cromosoma[1][0]];
    const dia_2_alimento1 = alimentos[cromosoma[1][1]];
    const dia_2_alimento2 = alimentos[cromosoma[1][2]];
    const dia_2_alimento3 = alimentos[cromosoma[1][3]];
    const dia_3_carnes = carnes[cromosoma[2][0]];
    const dia_3_alimento1 = alimentos[cromosoma[2][1]];
    const dia_3_alimento2 = alimentos[cromosoma[2][2]];
    const dia_3_alimento3 = alimentos[cromosoma[2][3]];
    const dia_4_carnes = carnes[cromosoma[3][0]];
    const dia_4_alimento1 = alimentos[cromosoma[3][1]];
    const dia_4_alimento2 = alimentos[cromosoma[3][2]];
    const dia_4_alimento3 = alimentos[cromosoma[3][3]];
    const dia_5_carnes = carnes[cromosoma[4][0]];
    const dia_5_alimento1 = alimentos[cromosoma[4][1]];
    const dia_5_alimento2 = alimentos[cromosoma[4][2]];
    const dia_5_alimento3 = alimentos[cromosoma[4][3]];
    const dia_6_carnes = carnes[cromosoma[4][0]];
    const dia_6_alimento1 = alimentos[cromosoma[5][1]];
    const dia_6_alimento2 = alimentos[cromosoma[5][2]];
    const dia_6_alimento3 = alimentos[cromosoma[5][3]];
    const factorCantidadCarne = Math.floor(Math.random() * 3) + 1;
    const factorCantidadAlimento1 = Math.floor(Math.random() * 3) + 1;
    const factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const factorCantidadAlimento3 = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadCarne = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento1 = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento3 = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadCarne = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadAlimento1 = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadAlimento3 = Math.floor(Math.random() * 3) + 1;
    const dia4_factorCantidadCarne = Math.floor(Math.random() * 3) + 1;
    const dia4_factorCantidadAlimento1 = Math.floor(Math.random() * 3) + 1;
    const dia4_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia4_factorCantidadAlimento3 = Math.floor(Math.random() * 3) + 1;
    const dia5_factorCantidadCarne = Math.floor(Math.random() * 3) + 1;
    const dia5_factorCantidadAlimento1 = Math.floor(Math.random() * 3) + 1;
    const dia5_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia5_factorCantidadAlimento3 = Math.floor(Math.random() * 3) + 1;
    const dia6_factorCantidadCarne = Math.floor(Math.random() * 3) + 1;
    const dia6_factorCantidadAlimento1 = Math.floor(Math.random() * 3) + 1;
    const dia6_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia6_factorCantidadAlimento3 = Math.floor(Math.random() * 3) + 1;
    const calculo_calorias = (dia_1_carnes.Cals * factorCantidadCarne) + (dia_1_alimento1.Cals * factorCantidadAlimento1) + (dia_1_alimento2.Cals * factorCantidadAlimento2) + (dia_1_alimento3.Cals * factorCantidadAlimento3) + (dia_2_carnes.Cals * dia2_factorCantidadCarne) + (dia_2_alimento1.Cals * dia2_factorCantidadAlimento1) + (dia_2_alimento2.Cals * dia2_factorCantidadAlimento2) + (dia_2_alimento3.Cals * dia2_factorCantidadAlimento3) + (dia_3_carnes.Cals * dia3_factorCantidadCarne) + (dia_3_alimento1.Cals * dia3_factorCantidadAlimento1) + (dia_3_alimento2.Cals * dia3_factorCantidadAlimento2) + (dia_3_alimento3.Cals * dia3_factorCantidadAlimento3) + (dia_4_carnes.Cals * dia4_factorCantidadCarne) + (dia_4_alimento1.Cals * dia4_factorCantidadAlimento1) + (dia_4_alimento2.Cals * dia4_factorCantidadAlimento2) + (dia_4_alimento3.Cals * dia4_factorCantidadAlimento3) + (dia_5_carnes.Cals * dia5_factorCantidadCarne) + (dia_5_alimento1.Cals * dia5_factorCantidadAlimento1) + (dia_5_alimento2.Cals * dia5_factorCantidadAlimento2) + (dia_5_alimento3.Cals * dia5_factorCantidadAlimento3) + (dia_6_carnes.Cals * dia6_factorCantidadCarne) + (dia_6_alimento1.Cals * dia6_factorCantidadAlimento1) + (dia_6_alimento2.Cals * dia6_factorCantidadAlimento2) + (dia_6_alimento3.Cals * dia6_factorCantidadAlimento3);
    const calculo_proteinas = dia_1_carnes.Prot + dia_1_alimento1.Prot + dia_1_alimento2.Prot + dia_1_alimento3.Prot + dia_2_carnes.Prot + dia_2_alimento1.Prot + dia_2_alimento2.Prot + dia_2_alimento3.Prot + dia_3_carnes.Prot + dia_3_alimento1.Prot + dia_3_alimento2.Prot + dia_3_alimento3.Prot + dia_4_carnes.Prot + dia_4_alimento1.Prot + dia_4_alimento2.Prot + dia_4_alimento3.Prot + dia_5_carnes.Prot + dia_5_alimento1.Prot + dia_5_alimento2.Prot + dia_5_alimento3.Prot + dia_6_carnes.Prot + dia_6_alimento1.Prot + dia_6_alimento2.Prot + dia_6_alimento3.Prot;
    if ( calculo_calorias >= (objetivoCaloria-360) && calculo_calorias <= (objetivoCaloria+360)) {
      dia_1_carnes.Cals = dia_1_carnes.Cals * factorCantidadCarne;
      dia_1_carnes.Prot = dia_1_carnes.Prot * factorCantidadCarne;
      dia_1_carnes.Grasa = dia_1_carnes.Grasa * factorCantidadCarne;
      switch (factorCantidadCarne) {
        case 2:
          dia_1_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_1_carnes.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento1.Cals = dia_1_alimento1.Cals * factorCantidadAlimento1;
      dia_1_alimento1.Prot = dia_1_alimento1.Prot * factorCantidadAlimento1;
      dia_1_alimento1.Grasa = dia_1_alimento1.Grasa * factorCantidadAlimento1;
      switch (factorCantidadAlimento1) {
        case 2:
          dia_1_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento1.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento2.Cals = dia_1_alimento2.Cals * factorCantidadAlimento2;
      dia_1_alimento2.Prot = dia_1_alimento2.Prot * factorCantidadAlimento2;
      dia_1_alimento2.Grasa = dia_1_alimento2.Grasa * factorCantidadAlimento2;
      switch (factorCantidadAlimento2) {
        case 2:
          dia_1_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento3.Cals = dia_1_alimento3.Cals * factorCantidadAlimento3;
      dia_1_alimento3.Prot = dia_1_alimento3.Prot * factorCantidadAlimento3;
      dia_1_alimento3.Grasa = dia_1_alimento3.Grasa * factorCantidadAlimento3;
      switch (factorCantidadAlimento3) {
        case 2:
          dia_1_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento3.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_2_carnes.Cals = dia_2_carnes.Cals * dia2_factorCantidadCarne;
      dia_2_carnes.Prot = dia_2_carnes.Prot * dia2_factorCantidadCarne;
      dia_2_carnes.Grasa = dia_2_carnes.Grasa * dia2_factorCantidadCarne;
      switch (dia2_factorCantidadCarne) {
        case 2:
          dia_2_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_2_carnes.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_2_alimento1.Cals = dia_2_alimento1.Cals * dia2_factorCantidadAlimento1;
      dia_2_alimento1.Prot = dia_2_alimento1.Prot * dia2_factorCantidadAlimento1;
      dia_2_alimento1.Grasa = dia_2_alimento1.Grasa * dia2_factorCantidadAlimento1;
      switch (dia2_factorCantidadAlimento1) {
        case 2:
          dia_2_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento1.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_2_alimento2.Cals = dia_2_alimento2.Cals * dia2_factorCantidadAlimento2;
      dia_2_alimento2.Prot = dia_2_alimento2.Prot * dia2_factorCantidadAlimento2;
      dia_2_alimento2.Grasa = dia_2_alimento2.Grasa * dia2_factorCantidadAlimento2;
      switch (dia2_factorCantidadAlimento2) {
        case 2:
          dia_2_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_2_alimento3.Cals = dia_2_alimento3.Cals * dia2_factorCantidadAlimento3;
      dia_2_alimento3.Prot = dia_2_alimento3.Prot * dia2_factorCantidadAlimento3;
      dia_2_alimento3.Grasa = dia_2_alimento3.Grasa * dia2_factorCantidadAlimento3;
      switch (dia2_factorCantidadAlimento3) {
        case 2:
          dia_2_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento3.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_3_carnes.Cals = dia_3_carnes.Cals * dia3_factorCantidadCarne;
      dia_3_carnes.Prot = dia_3_carnes.Prot * dia3_factorCantidadCarne;
      dia_3_carnes.Grasa = dia_3_carnes.Grasa * dia3_factorCantidadCarne;
      switch (dia3_factorCantidadCarne) {
        case 2:
          dia_3_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_3_carnes.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_3_alimento1.Cals = dia_3_alimento1.Cals * dia3_factorCantidadAlimento1;
      dia_3_alimento1.Prot = dia_3_alimento1.Prot * dia3_factorCantidadAlimento1;
      dia_3_alimento1.Grasa = dia_3_alimento1.Grasa * dia3_factorCantidadAlimento1;
      switch (dia3_factorCantidadAlimento1) {
        case 2:
          dia_3_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_3_alimento1.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_3_alimento2.Cals = dia_3_alimento2.Cals * dia3_factorCantidadAlimento2;
      dia_3_alimento2.Prot = dia_3_alimento2.Prot * dia3_factorCantidadAlimento2;
      dia_3_alimento2.Grasa = dia_3_alimento2.Grasa * dia3_factorCantidadAlimento2;
      switch (dia3_factorCantidadAlimento2) {
        case 2:
          dia_3_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_3_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_3_alimento3.Cals = dia_3_alimento3.Cals * dia3_factorCantidadAlimento3;
      dia_3_alimento3.Prot = dia_3_alimento3.Prot * dia3_factorCantidadAlimento3;
      dia_3_alimento3.Grasa = dia_3_alimento3.Grasa * dia3_factorCantidadAlimento3;
      switch (dia3_factorCantidadAlimento3) {
        case 2:
          dia_3_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_3_alimento3.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_4_carnes.Cals = dia_4_carnes.Cals * dia4_factorCantidadCarne;
      dia_4_carnes.Prot = dia_4_carnes.Prot * dia4_factorCantidadCarne;
      dia_4_carnes.Grasa = dia_4_carnes.Grasa * dia4_factorCantidadCarne;
      switch (dia4_factorCantidadCarne) {
        case 2:
          dia_4_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_4_carnes.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_4_alimento1.Cals = dia_4_alimento1.Cals * dia4_factorCantidadAlimento1;
      dia_4_alimento1.Prot = dia_4_alimento1.Prot * dia4_factorCantidadAlimento1;
      dia_4_alimento1.Grasa = dia_4_alimento1.Grasa * dia4_factorCantidadAlimento1;
      switch (dia4_factorCantidadAlimento1) {
        case 2:
          dia_4_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_4_alimento1.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_4_alimento2.Cals = dia_4_alimento2.Cals * dia4_factorCantidadAlimento2;
      dia_4_alimento2.Prot = dia_4_alimento2.Prot * dia4_factorCantidadAlimento2;
      dia_4_alimento2.Grasa = dia_4_alimento2.Grasa * dia4_factorCantidadAlimento2;
      switch (dia4_factorCantidadAlimento2) {
        case 2:
          dia_4_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_4_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_4_alimento3.Cals = dia_4_alimento3.Cals * dia4_factorCantidadAlimento3;
      dia_4_alimento3.Prot = dia_4_alimento3.Prot * dia4_factorCantidadAlimento3;
      dia_4_alimento3.Grasa = dia_4_alimento3.Grasa * dia4_factorCantidadAlimento3;
      switch (dia4_factorCantidadAlimento3) {
        case 2:
          dia_4_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_4_alimento3.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_5_carnes.Cals = dia_5_carnes.Cals * dia5_factorCantidadCarne;
      dia_5_carnes.Prot = dia_5_carnes.Prot * dia5_factorCantidadCarne;
      dia_5_carnes.Grasa = dia_5_carnes.Grasa * dia5_factorCantidadCarne;
      switch (dia5_factorCantidadCarne) {
        case 2:
          dia_5_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_5_carnes.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_5_alimento1.Cals = dia_5_alimento1.Cals * dia5_factorCantidadAlimento1;
      dia_5_alimento1.Prot = dia_5_alimento1.Prot * dia5_factorCantidadAlimento1;
      dia_5_alimento1.Grasa = dia_5_alimento1.Grasa * dia5_factorCantidadAlimento1;
      switch (dia5_factorCantidadAlimento1) {
        case 2:
          dia_5_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_5_alimento1.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_5_alimento2.Cals = dia_5_alimento2.Cals * dia5_factorCantidadAlimento2;
      dia_5_alimento2.Prot = dia_5_alimento2.Prot * dia5_factorCantidadAlimento2;
      dia_5_alimento2.Grasa = dia_5_alimento2.Grasa * dia5_factorCantidadAlimento2;
      switch (dia5_factorCantidadAlimento2) {
        case 2:
          dia_5_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_5_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_5_alimento3.Cals = dia_5_alimento3.Cals * dia5_factorCantidadAlimento3;
      dia_5_alimento3.Prot = dia_5_alimento3.Prot * dia5_factorCantidadAlimento3;
      dia_5_alimento3.Grasa = dia_5_alimento3.Grasa * dia5_factorCantidadAlimento3;
      switch (dia5_factorCantidadAlimento3) {
        case 2:
          dia_5_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_5_alimento3.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_6_carnes.Cals = dia_6_carnes.Cals * dia6_factorCantidadCarne;
      dia_6_carnes.Prot = dia_6_carnes.Prot * dia6_factorCantidadCarne;
      dia_6_carnes.Grasa = dia_6_carnes.Grasa * dia6_factorCantidadCarne;
      switch (dia6_factorCantidadCarne) {
        case 2:
          dia_6_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_6_carnes.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_6_alimento1.Cals = dia_6_alimento1.Cals * dia6_factorCantidadAlimento1;
      dia_6_alimento1.Prot = dia_6_alimento1.Prot * dia6_factorCantidadAlimento1;
      dia_6_alimento1.Grasa = dia_6_alimento1.Grasa * dia6_factorCantidadAlimento1;
      switch (dia6_factorCantidadAlimento1) {
        case 2:
          dia_6_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_6_alimento1.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_6_alimento2.Cals = dia_6_alimento2.Cals * dia6_factorCantidadAlimento2;
      dia_6_alimento2.Prot = dia_6_alimento2.Prot * dia6_factorCantidadAlimento2;
      dia_6_alimento2.Grasa = dia_6_alimento2.Grasa * dia6_factorCantidadAlimento2;
      switch (dia6_factorCantidadAlimento2) {
        case 2:
          dia_6_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_6_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_6_alimento3.Cals = dia_6_alimento3.Cals * dia6_factorCantidadAlimento3;
      dia_6_alimento3.Prot = dia_6_alimento3.Prot * dia6_factorCantidadAlimento3;
      dia_6_alimento3.Grasa = dia_6_alimento3.Grasa * dia6_factorCantidadAlimento3;
      switch (dia5_factorCantidadAlimento3) {
        case 2:
          dia_6_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_6_alimento3.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      return {
        resultado: true,
        almuerzo: {
          primerElemento: dia_1_carnes,
          segundoElemento: dia_1_alimento1,
          tercerElemento: dia_1_alimento2,
          cuartoElemento: dia_1_alimento3,
        },
        almuerzo2: {
          primerElemento: dia_2_carnes,
          segundoElemento: dia_2_alimento1,
          tercerElemento: dia_2_alimento2,
          cuartoElemento: dia_2_alimento3,
        },
        almuerzo3: {
          primerElemento: dia_3_carnes,
          segundoElemento: dia_3_alimento1,
          tercerElemento: dia_3_alimento2,
          cuartoElemento: dia_3_alimento3,
        },
        almuerzo4: {
          primerElemento: dia_4_carnes,
          segundoElemento: dia_4_alimento1,
          tercerElemento: dia_4_alimento2,
          cuartoElemento: dia_4_alimento3,
        },
        almuerzo5: {
          primerElemento: dia_5_carnes,
          segundoElemento: dia_5_alimento1,
          tercerElemento: dia_5_alimento2,
          cuartoElemento: dia_5_alimento3,
        },
        almuerzo6: {
          primerElemento: dia_6_carnes,
          segundoElemento: dia_6_alimento1,
          tercerElemento: dia_6_alimento2,
          cuartoElemento: dia_6_alimento3,
        },
      };
    } else {
      return {
        resultado: false,
        almuerzo: {
          primerElemento: dia_1_carnes,
          segundoElemento: dia_1_alimento1,
          tercerElemento: dia_1_alimento2,
          cuartoElemento: dia_1_alimento3,
        },
        almuerzo2: {
          primerElemento: dia_2_carnes,
          segundoElemento: dia_2_alimento1,
          tercerElemento: dia_2_alimento2,
          cuartoElemento: dia_2_alimento3,
        },
        almuerzo3: {
          primerElemento: dia_3_carnes,
          segundoElemento: dia_3_alimento1,
          tercerElemento: dia_3_alimento2,
          cuartoElemento: dia_3_alimento3,
        },
        almuerzo4: {
          primerElemento: dia_4_carnes,
          segundoElemento: dia_4_alimento1,
          tercerElemento: dia_4_alimento2,
          cuartoElemento: dia_4_alimento3,
        },
        almuerzo5: {
          primerElemento: dia_5_carnes,
          segundoElemento: dia_5_alimento1,
          tercerElemento: dia_5_alimento2,
          cuartoElemento: dia_5_alimento3,
        },
        almuerzo6: {
          primerElemento: dia_6_carnes,
          segundoElemento: dia_6_alimento1,
          tercerElemento: dia_6_alimento2,
          cuartoElemento: dia_6_alimento3,
        },
      };
    }
  } else if (dias === 7) {
    const dia_1_carnes = carnes[cromosoma[0][0]];
    const dia_1_alimento1 = alimentos[cromosoma[0][1]];
    const dia_1_alimento2 = alimentos[cromosoma[0][2]];
    const dia_1_alimento3 = alimentos[cromosoma[0][3]];
    const dia_2_carnes = carnes[cromosoma[1][0]];
    const dia_2_alimento1 = alimentos[cromosoma[1][1]];
    const dia_2_alimento2 = alimentos[cromosoma[1][2]];
    const dia_2_alimento3 = alimentos[cromosoma[1][3]];
    const dia_3_carnes = carnes[cromosoma[2][0]];
    const dia_3_alimento1 = alimentos[cromosoma[2][1]];
    const dia_3_alimento2 = alimentos[cromosoma[2][2]];
    const dia_3_alimento3 = alimentos[cromosoma[2][3]];
    const dia_4_carnes = carnes[cromosoma[3][0]];
    const dia_4_alimento1 = alimentos[cromosoma[3][1]];
    const dia_4_alimento2 = alimentos[cromosoma[3][2]];
    const dia_4_alimento3 = alimentos[cromosoma[3][3]];
    const dia_5_carnes = carnes[cromosoma[4][0]];
    const dia_5_alimento1 = alimentos[cromosoma[4][1]];
    const dia_5_alimento2 = alimentos[cromosoma[4][2]];
    const dia_5_alimento3 = alimentos[cromosoma[4][3]];
    const dia_6_carnes = carnes[cromosoma[5][0]];
    const dia_6_alimento1 = alimentos[cromosoma[5][1]];
    const dia_6_alimento2 = alimentos[cromosoma[5][2]];
    const dia_6_alimento3 = alimentos[cromosoma[5][3]];
    const dia_7_carnes = carnes[cromosoma[6][0]];
    const dia_7_alimento1 = alimentos[cromosoma[6][1]];
    const dia_7_alimento2 = alimentos[cromosoma[6][2]];
    const dia_7_alimento3 = alimentos[cromosoma[6][3]];
    const factorCantidadCarne = Math.floor(Math.random() * 4) + 1;
    const factorCantidadAlimento1 = Math.floor(Math.random() * 4) + 1;
    const factorCantidadAlimento2 = Math.floor(Math.random() * 4) + 1;
    const factorCantidadAlimento3 = Math.floor(Math.random() * 4) + 1;
    const dia2_factorCantidadCarne = Math.floor(Math.random() * 4) + 1;
    const dia2_factorCantidadAlimento1 = Math.floor(Math.random() * 4) + 1;
    const dia2_factorCantidadAlimento2 = Math.floor(Math.random() * 4) + 1;
    const dia2_factorCantidadAlimento3 = Math.floor(Math.random() * 4) + 1;
    const dia3_factorCantidadCarne = Math.floor(Math.random() * 4) + 1;
    const dia3_factorCantidadAlimento1 = Math.floor(Math.random() * 4) + 1;
    const dia3_factorCantidadAlimento2 = Math.floor(Math.random() * 4) + 1;
    const dia3_factorCantidadAlimento3 = Math.floor(Math.random() * 4) + 1;
    const dia4_factorCantidadCarne = Math.floor(Math.random() * 4) + 1;
    const dia4_factorCantidadAlimento1 = Math.floor(Math.random() * 4) + 1;
    const dia4_factorCantidadAlimento2 = Math.floor(Math.random() * 4) + 1;
    const dia4_factorCantidadAlimento3 = Math.floor(Math.random() * 4) + 1;
    const dia5_factorCantidadCarne = Math.floor(Math.random() * 4) + 1;
    const dia5_factorCantidadAlimento1 = Math.floor(Math.random() * 4) + 1;
    const dia5_factorCantidadAlimento2 = Math.floor(Math.random() * 4) + 1;
    const dia5_factorCantidadAlimento3 = Math.floor(Math.random() * 4) + 1;
    const dia6_factorCantidadCarne = Math.floor(Math.random() * 4) + 1;
    const dia6_factorCantidadAlimento1 = Math.floor(Math.random() * 4) + 1;
    const dia6_factorCantidadAlimento2 = Math.floor(Math.random() * 4) + 1;
    const dia6_factorCantidadAlimento3 = Math.floor(Math.random() * 4) + 1;
    const dia7_factorCantidadCarne = Math.floor(Math.random() * 4) + 1;
    const dia7_factorCantidadAlimento1 = Math.floor(Math.random() * 4) + 1;
    const dia7_factorCantidadAlimento2 = Math.floor(Math.random() * 4) + 1;
    const dia7_factorCantidadAlimento3 = Math.floor(Math.random() * 4) + 1;
    const calculo_calorias = (dia_1_carnes.Cals * factorCantidadCarne) + (dia_1_alimento1.Cals * factorCantidadAlimento1) + (dia_1_alimento2.Cals * factorCantidadAlimento2) + (dia_1_alimento3.Cals * factorCantidadAlimento3) + (dia_2_carnes.Cals * dia2_factorCantidadCarne) + (dia_2_alimento1.Cals * dia2_factorCantidadAlimento1) + (dia_2_alimento2.Cals * dia2_factorCantidadAlimento2) + (dia_2_alimento3.Cals * dia2_factorCantidadAlimento3) + (dia_3_carnes.Cals * dia3_factorCantidadCarne) + (dia_3_alimento1.Cals * dia3_factorCantidadAlimento1) + (dia_3_alimento2.Cals * dia3_factorCantidadAlimento2) + (dia_3_alimento3.Cals * dia3_factorCantidadAlimento3) + (dia_4_carnes.Cals * dia4_factorCantidadCarne) + (dia_4_alimento1.Cals * dia4_factorCantidadAlimento1) + (dia_4_alimento2.Cals * dia4_factorCantidadAlimento2) + (dia_4_alimento3.Cals * dia4_factorCantidadAlimento3) + (dia_5_carnes.Cals * dia5_factorCantidadCarne) + (dia_5_alimento1.Cals * dia5_factorCantidadAlimento1) + (dia_5_alimento2.Cals * dia5_factorCantidadAlimento2) + (dia_5_alimento3.Cals * dia5_factorCantidadAlimento3) + (dia_6_carnes.Cals * dia6_factorCantidadCarne) + (dia_6_alimento1.Cals * dia6_factorCantidadAlimento1) + (dia_6_alimento2.Cals * dia6_factorCantidadAlimento2) + (dia_6_alimento3.Cals * dia6_factorCantidadAlimento3) + (dia_7_carnes.Cals * dia7_factorCantidadCarne) + (dia_7_alimento1.Cals * dia7_factorCantidadAlimento1) + (dia_7_alimento2.Cals * dia7_factorCantidadAlimento2) + (dia_7_alimento3.Cals * dia7_factorCantidadAlimento3);
    const calculo_proteinas = dia_1_carnes.Prot + dia_1_alimento1.Prot + dia_1_alimento2.Prot + dia_1_alimento3.Prot + dia_2_carnes.Prot + dia_2_alimento1.Prot + dia_2_alimento2.Prot + dia_2_alimento3.Prot + dia_3_carnes.Prot + dia_3_alimento1.Prot + dia_3_alimento2.Prot + dia_3_alimento3.Prot + dia_4_carnes.Prot + dia_4_alimento1.Prot + dia_4_alimento2.Prot + dia_4_alimento3.Prot + dia_5_carnes.Prot + dia_5_alimento1.Prot + dia_5_alimento2.Prot + dia_5_alimento3.Prot + dia_6_carnes.Prot + dia_6_alimento1.Prot + dia_6_alimento2.Prot + dia_6_alimento3.Prot + dia_7_carnes.Prot + dia_7_alimento1.Prot + dia_7_alimento2.Prot + dia_7_alimento3.Prot;
    if ( calculo_calorias >= (objetivoCaloria-420) && calculo_calorias <= (objetivoCaloria+420)) {
      dia_1_carnes.Cals = dia_1_carnes.Cals * factorCantidadCarne;
      dia_1_carnes.Prot = dia_1_carnes.Prot * factorCantidadCarne;
      dia_1_carnes.Grasa = dia_1_carnes.Grasa * factorCantidadCarne;
      switch (factorCantidadCarne) {
        case 2:
          dia_1_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_1_carnes.cantidad = "300 g";
          break;
        case 4:
          dia_1_carnes.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento1.Cals = dia_1_alimento1.Cals * factorCantidadAlimento1;
      dia_1_alimento1.Prot = dia_1_alimento1.Prot * factorCantidadAlimento1;
      dia_1_alimento1.Grasa = dia_1_alimento1.Grasa * factorCantidadAlimento1;
      switch (factorCantidadAlimento1) {
        case 2:
          dia_1_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento1.cantidad = "300 g";
          break;
        case 4:
          dia_1_alimento1.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento2.Cals = dia_1_alimento2.Cals * factorCantidadAlimento2;
      dia_1_alimento2.Prot = dia_1_alimento2.Prot * factorCantidadAlimento2;
      dia_1_alimento2.Grasa = dia_1_alimento2.Grasa * factorCantidadAlimento2;
      switch (factorCantidadAlimento2) {
        case 2:
          dia_1_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento2.cantidad = "300 g";
          break;
        case 4:
          dia_1_alimento2.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento3.Cals = dia_1_alimento3.Cals * factorCantidadAlimento3;
      dia_1_alimento3.Prot = dia_1_alimento3.Prot * factorCantidadAlimento3;
      dia_1_alimento3.Grasa = dia_1_alimento3.Grasa * factorCantidadAlimento3;
      switch (factorCantidadAlimento3) {
        case 2:
          dia_1_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento3.cantidad = "300 g";
          break;
        case 4:
          dia_1_alimento3.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_2_carnes.Cals = dia_2_carnes.Cals * dia2_factorCantidadCarne;
      dia_2_carnes.Prot = dia_2_carnes.Prot * dia2_factorCantidadCarne;
      dia_2_carnes.Grasa = dia_2_carnes.Grasa * dia2_factorCantidadCarne;
      switch (dia2_factorCantidadCarne) {
        case 2:
          dia_2_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_2_carnes.cantidad = "300 g";
          break;
        case 4:
          dia_2_carnes.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_2_alimento1.Cals = dia_2_alimento1.Cals * dia2_factorCantidadAlimento1;
      dia_2_alimento1.Prot = dia_2_alimento1.Prot * dia2_factorCantidadAlimento1;
      dia_2_alimento1.Grasa = dia_2_alimento1.Grasa * dia2_factorCantidadAlimento1;
      switch (dia2_factorCantidadAlimento1) {
        case 2:
          dia_2_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento1.cantidad = "300 g";
          break;
        case 4:
          dia_2_alimento1.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_2_alimento2.Cals = dia_2_alimento2.Cals * dia2_factorCantidadAlimento2;
      dia_2_alimento2.Prot = dia_2_alimento2.Prot * dia2_factorCantidadAlimento2;
      dia_2_alimento2.Grasa = dia_2_alimento2.Grasa * dia2_factorCantidadAlimento2;
      switch (dia2_factorCantidadAlimento2) {
        case 2:
          dia_2_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento2.cantidad = "300 g";
          break;
        case 4:
          dia_2_alimento2.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_2_alimento3.Cals = dia_2_alimento3.Cals * dia2_factorCantidadAlimento3;
      dia_2_alimento3.Prot = dia_2_alimento3.Prot * dia2_factorCantidadAlimento3;
      dia_2_alimento3.Grasa = dia_2_alimento3.Grasa * dia2_factorCantidadAlimento3;
      switch (dia2_factorCantidadAlimento3) {
        case 2:
          dia_2_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento3.cantidad = "300 g";
          break;
        case 4:
          dia_2_alimento3.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_3_carnes.Cals = dia_3_carnes.Cals * dia3_factorCantidadCarne;
      dia_3_carnes.Prot = dia_3_carnes.Prot * dia3_factorCantidadCarne;
      dia_3_carnes.Grasa = dia_3_carnes.Grasa * dia3_factorCantidadCarne;
      switch (dia3_factorCantidadCarne) {
        case 2:
          dia_3_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_3_carnes.cantidad = "300 g";
          break;
        case 4:
          dia_3_carnes.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_3_alimento1.Cals = dia_3_alimento1.Cals * dia3_factorCantidadAlimento1;
      dia_3_alimento1.Prot = dia_3_alimento1.Prot * dia3_factorCantidadAlimento1;
      dia_3_alimento1.Grasa = dia_3_alimento1.Grasa * dia3_factorCantidadAlimento1;
      switch (dia3_factorCantidadAlimento1) {
        case 2:
          dia_3_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_3_alimento1.cantidad = "300 g";
          break;
        case 4:
          dia_3_alimento1.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_3_alimento2.Cals = dia_3_alimento2.Cals * dia3_factorCantidadAlimento2;
      dia_3_alimento2.Prot = dia_3_alimento2.Prot * dia3_factorCantidadAlimento2;
      dia_3_alimento2.Grasa = dia_3_alimento2.Grasa * dia3_factorCantidadAlimento2;
      switch (dia3_factorCantidadAlimento2) {
        case 2:
          dia_3_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_3_alimento2.cantidad = "300 g";
          break;
        case 4:
          dia_3_alimento2.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_3_alimento3.Cals = dia_3_alimento3.Cals * dia3_factorCantidadAlimento3;
      dia_3_alimento3.Prot = dia_3_alimento3.Prot * dia3_factorCantidadAlimento3;
      dia_3_alimento3.Grasa = dia_3_alimento3.Grasa * dia3_factorCantidadAlimento3;
      switch (dia3_factorCantidadAlimento3) {
        case 2:
          dia_3_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_3_alimento3.cantidad = "300 g";
          break;
        case 4:
          dia_3_alimento3.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_4_carnes.Cals = dia_4_carnes.Cals * dia4_factorCantidadCarne;
      dia_4_carnes.Prot = dia_4_carnes.Prot * dia4_factorCantidadCarne;
      dia_4_carnes.Grasa = dia_4_carnes.Grasa * dia4_factorCantidadCarne;
      switch (dia4_factorCantidadCarne) {
        case 2:
          dia_4_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_4_carnes.cantidad = "300 g";
          break;
        case 4:
          dia_4_carnes.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_4_alimento1.Cals = dia_4_alimento1.Cals * dia4_factorCantidadAlimento1;
      dia_4_alimento1.Prot = dia_4_alimento1.Prot * dia4_factorCantidadAlimento1;
      dia_4_alimento1.Grasa = dia_4_alimento1.Grasa * dia4_factorCantidadAlimento1;
      switch (dia4_factorCantidadAlimento1) {
        case 2:
          dia_4_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_4_alimento1.cantidad = "300 g";
          break;
        case 4:
          dia_4_alimento1.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_4_alimento2.Cals = dia_4_alimento2.Cals * dia4_factorCantidadAlimento2;
      dia_4_alimento2.Prot = dia_4_alimento2.Prot * dia4_factorCantidadAlimento2;
      dia_4_alimento2.Grasa = dia_4_alimento2.Grasa * dia4_factorCantidadAlimento2;
      switch (dia4_factorCantidadAlimento2) {
        case 2:
          dia_4_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_4_alimento2.cantidad = "300 g";
          break;
        case 4:
          dia_4_alimento2.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_4_alimento3.Cals = dia_4_alimento3.Cals * dia4_factorCantidadAlimento3;
      dia_4_alimento3.Prot = dia_4_alimento3.Prot * dia4_factorCantidadAlimento3;
      dia_4_alimento3.Grasa = dia_4_alimento3.Grasa * dia4_factorCantidadAlimento3;
      switch (dia4_factorCantidadAlimento3) {
        case 2:
          dia_4_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_4_alimento3.cantidad = "300 g";
          break;
        case 4:
          dia_4_alimento3.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_5_carnes.Cals = dia_5_carnes.Cals * dia5_factorCantidadCarne;
      dia_5_carnes.Prot = dia_5_carnes.Prot * dia5_factorCantidadCarne;
      dia_5_carnes.Grasa = dia_5_carnes.Grasa * dia5_factorCantidadCarne;
      switch (dia5_factorCantidadCarne) {
        case 2:
          dia_5_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_5_carnes.cantidad = "300 g";
          break;
        case 4:
          dia_5_carnes.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_5_alimento1.Cals = dia_5_alimento1.Cals * dia5_factorCantidadAlimento1;
      dia_5_alimento1.Prot = dia_5_alimento1.Prot * dia5_factorCantidadAlimento1;
      dia_5_alimento1.Grasa = dia_5_alimento1.Grasa * dia5_factorCantidadAlimento1;
      switch (dia5_factorCantidadAlimento1) {
        case 2:
          dia_5_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_5_alimento1.cantidad = "300 g";
          break;
        case 4:
          dia_5_alimento1.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_5_alimento2.Cals = dia_5_alimento2.Cals * dia5_factorCantidadAlimento2;
      dia_5_alimento2.Prot = dia_5_alimento2.Prot * dia5_factorCantidadAlimento2;
      dia_5_alimento2.Grasa = dia_5_alimento2.Grasa * dia5_factorCantidadAlimento2;
      switch (dia5_factorCantidadAlimento2) {
        case 2:
          dia_5_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_5_alimento2.cantidad = "300 g";
          break;
        case 4:
          dia_5_alimento2.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_5_alimento3.Cals = dia_5_alimento3.Cals * dia5_factorCantidadAlimento3;
      dia_5_alimento3.Prot = dia_5_alimento3.Prot * dia5_factorCantidadAlimento3;
      dia_5_alimento3.Grasa = dia_5_alimento3.Grasa * dia5_factorCantidadAlimento3;
      switch (dia5_factorCantidadAlimento3) {
        case 2:
          dia_5_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_5_alimento3.cantidad = "300 g";
          break;
        case 4:
          dia_5_alimento3.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_6_carnes.Cals = dia_6_carnes.Cals * dia6_factorCantidadCarne;
      dia_6_carnes.Prot = dia_6_carnes.Prot * dia6_factorCantidadCarne;
      dia_6_carnes.Grasa = dia_6_carnes.Grasa * dia6_factorCantidadCarne;
      switch (dia6_factorCantidadCarne) {
        case 2:
          dia_6_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_6_carnes.cantidad = "300 g";
          break;
        case 4:
          dia_6_carnes.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_6_alimento1.Cals = dia_6_alimento1.Cals * dia6_factorCantidadAlimento1;
      dia_6_alimento1.Prot = dia_6_alimento1.Prot * dia6_factorCantidadAlimento1;
      dia_6_alimento1.Grasa = dia_6_alimento1.Grasa * dia6_factorCantidadAlimento1;
      switch (dia6_factorCantidadAlimento1) {
        case 2:
          dia_6_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_6_alimento1.cantidad = "300 g";
          break;
        case 4:
          dia_6_alimento1.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_6_alimento2.Cals = dia_6_alimento2.Cals * dia6_factorCantidadAlimento2;
      dia_6_alimento2.Prot = dia_6_alimento2.Prot * dia6_factorCantidadAlimento2;
      dia_6_alimento2.Grasa = dia_6_alimento2.Grasa * dia6_factorCantidadAlimento2;
      switch (dia6_factorCantidadAlimento2) {
        case 2:
          dia_6_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_6_alimento2.cantidad = "300 g";
          break;
        case 4:
          dia_6_alimento2.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_6_alimento3.Cals = dia_6_alimento3.Cals * dia6_factorCantidadAlimento3;
      dia_6_alimento3.Prot = dia_6_alimento3.Prot * dia6_factorCantidadAlimento3;
      dia_6_alimento3.Grasa = dia_6_alimento3.Grasa * dia6_factorCantidadAlimento3;
      switch (dia5_factorCantidadAlimento3) {
        case 2:
          dia_6_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_6_alimento3.cantidad = "300 g";
          break;
        case 4:
          dia_6_alimento3.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_7_carnes.Cals = dia_7_carnes.Cals * dia7_factorCantidadCarne;
      dia_7_carnes.Prot = dia_7_carnes.Prot * dia7_factorCantidadCarne;
      dia_7_carnes.Grasa = dia_7_carnes.Grasa * dia7_factorCantidadCarne;
      switch (dia7_factorCantidadCarne) {
        case 2:
          dia_7_carnes.cantidad = "200 g";
          break;
        case 3:
          dia_7_carnes.cantidad = "300 g";
          break;
        case 4:
          dia_7_carnes.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_7_alimento1.Cals = dia_7_alimento1.Cals * dia7_factorCantidadAlimento1;
      dia_7_alimento1.Prot = dia_7_alimento1.Prot * dia7_factorCantidadAlimento1;
      dia_7_alimento1.Grasa = dia_7_alimento1.Grasa * dia7_factorCantidadAlimento1;
      switch (dia7_factorCantidadAlimento1) {
        case 2:
          dia_7_alimento1.cantidad = "200 g";
          break;
        case 3:
          dia_7_alimento1.cantidad = "300 g";
          break;
        case 4:
          dia_7_alimento1.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_7_alimento2.Cals = dia_7_alimento2.Cals * dia7_factorCantidadAlimento2;
      dia_7_alimento2.Prot = dia_7_alimento2.Prot * dia7_factorCantidadAlimento2;
      dia_7_alimento2.Grasa = dia_7_alimento2.Grasa * dia7_factorCantidadAlimento2;
      switch (dia7_factorCantidadAlimento2) {
        case 2:
          dia_7_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_7_alimento2.cantidad = "300 g";
          break;
        case 4:
          dia_7_alimento2.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_7_alimento3.Cals = dia_7_alimento3.Cals * dia7_factorCantidadAlimento3;
      dia_7_alimento3.Prot = dia_7_alimento3.Prot * dia7_factorCantidadAlimento3;
      dia_7_alimento3.Grasa = dia_7_alimento3.Grasa * dia7_factorCantidadAlimento3;
      switch (dia7_factorCantidadAlimento3) {
        case 2:
          dia_7_alimento3.cantidad = "200 g";
          break;
        case 3:
          dia_7_alimento3.cantidad = "300 g";
          break;
        case 4:
          dia_7_alimento3.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      return {
        resultado: true,
        almuerzo: {
          primerElemento: dia_1_carnes,
          segundoElemento: dia_1_alimento1,
          tercerElemento: dia_1_alimento2,
          cuartoElemento: dia_1_alimento3,
        },
        almuerzo2: {
          primerElemento: dia_2_carnes,
          segundoElemento: dia_2_alimento1,
          tercerElemento: dia_2_alimento2,
          cuartoElemento: dia_2_alimento3,
        },
        almuerzo3: {
          primerElemento: dia_3_carnes,
          segundoElemento: dia_3_alimento1,
          tercerElemento: dia_3_alimento2,
          cuartoElemento: dia_3_alimento3,
        },
        almuerzo4: {
          primerElemento: dia_4_carnes,
          segundoElemento: dia_4_alimento1,
          tercerElemento: dia_4_alimento2,
          cuartoElemento: dia_4_alimento3,
        },
        almuerzo5: {
          primerElemento: dia_5_carnes,
          segundoElemento: dia_5_alimento1,
          tercerElemento: dia_5_alimento2,
          cuartoElemento: dia_5_alimento3,
        },
        almuerzo6: {
          primerElemento: dia_6_carnes,
          segundoElemento: dia_6_alimento1,
          tercerElemento: dia_6_alimento2,
          cuartoElemento: dia_6_alimento3,
        },
        almuerzo7: {
          primerElemento: dia_7_carnes,
          segundoElemento: dia_7_alimento1,
          tercerElemento: dia_7_alimento2,
          cuartoElemento: dia_7_alimento3,
        },
      };
    } else {
      return {
        resultado: false,
        almuerzo: {
          primerElemento: dia_1_carnes,
          segundoElemento: dia_1_alimento1,
          tercerElemento: dia_1_alimento2,
          cuartoElemento: dia_1_alimento3,
        },
        almuerzo2: {
          primerElemento: dia_2_carnes,
          segundoElemento: dia_2_alimento1,
          tercerElemento: dia_2_alimento2,
          cuartoElemento: dia_2_alimento3,
        },
        almuerzo3: {
          primerElemento: dia_3_carnes,
          segundoElemento: dia_3_alimento1,
          tercerElemento: dia_3_alimento2,
          cuartoElemento: dia_3_alimento3,
        },
        almuerzo4: {
          primerElemento: dia_4_carnes,
          segundoElemento: dia_4_alimento1,
          tercerElemento: dia_4_alimento2,
          cuartoElemento: dia_4_alimento3,
        },
        almuerzo5: {
          primerElemento: dia_5_carnes,
          segundoElemento: dia_5_alimento1,
          tercerElemento: dia_5_alimento2,
          cuartoElemento: dia_5_alimento3,
        },
        almuerzo6: {
          primerElemento: dia_6_carnes,
          segundoElemento: dia_6_alimento1,
          tercerElemento: dia_6_alimento2,
          cuartoElemento: dia_6_alimento3,
        },
        almuerzo7: {
          primerElemento: dia_7_carnes,
          segundoElemento: dia_7_alimento1,
          tercerElemento: dia_7_alimento2,
          cuartoElemento: dia_7_alimento3,
        },
      };
    }
  }
};

const funcionFitnesSnack = (cromosoma, alimentos, objetivoCaloria, ObjetivoProteina, dias) => {
  if (dias === 1) {
    const factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia_1_alimento = alimentos[cromosoma[0]];
    const dia_1_alimento2 = alimentos[cromosoma[1]];
    const calculo_calorias = (dia_1_alimento.Cals * factorCantidadAlimento) + (dia_1_alimento2.Cals * factorCantidadAlimento2);
    const calculo_proteinas = (dia_1_alimento.Prot * factorCantidadAlimento) + (dia_1_alimento2.Prot * factorCantidadAlimento2);
    if ( calculo_calorias >= (objetivoCaloria-60) && calculo_calorias <= (objetivoCaloria+60)) {
      dia_1_alimento.Cals = dia_1_alimento.Cals * factorCantidadAlimento;
      dia_1_alimento.Prot = dia_1_alimento.Prot * factorCantidadAlimento;
      dia_1_alimento.Grasa = dia_1_alimento.Grasa * factorCantidadAlimento;
      switch (factorCantidadAlimento) {
        case 2:
          dia_1_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento2.Cals = dia_1_alimento2.Cals * factorCantidadAlimento2;
      dia_1_alimento2.Prot = dia_1_alimento2.Prot * factorCantidadAlimento2;
      dia_1_alimento2.Grasa = dia_1_alimento2.Grasa * factorCantidadAlimento2;
      switch (factorCantidadAlimento2) {
        case 2:
          dia_1_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      return {
        resultado: true,
        snack: {
          primerElemento: dia_1_alimento,
          segundoElemeto: dia_1_alimento2,
        },
      };
    } else {
      return {
        resultado: false,
        snack: {
          primerElemento: dia_1_alimento,
          segundoElemeto: dia_1_alimento2,
        },
      };
    }
  } else if (dias === 2) {
    const dia_1_alimento = alimentos[cromosoma[0][0]];
    const dia_1_alimento2 = alimentos[cromosoma[0][1]];
    const dia_2_alimento = alimentos[cromosoma[1][0]];
    const dia_2_alimento2 = alimentos[cromosoma[1][1]];
    const factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const calculo_calorias = (dia_1_alimento.Cals * factorCantidadAlimento) + (dia_1_alimento2.Cals * factorCantidadAlimento2) + (dia_2_alimento.Cals * dia2_factorCantidadAlimento) + (dia_2_alimento2.Cals * dia2_factorCantidadAlimento2);
    const calculo_proteinas = dia_1_alimento.Prot + dia_1_alimento2.Prot + dia_2_alimento.Prot + dia_2_alimento2.Prot;
    if ( calculo_calorias >= (objetivoCaloria-120) && calculo_calorias <= (objetivoCaloria+120)) {
      dia_1_alimento.Cals = dia_1_alimento.Cals * factorCantidadAlimento;
      dia_1_alimento.Prot = dia_1_alimento.Prot * factorCantidadAlimento;
      dia_1_alimento.Grasa = dia_1_alimento.Grasa * factorCantidadAlimento;
      switch (factorCantidadAlimento) {
        case 2:
          dia_1_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento2.Cals = dia_1_alimento2.Cals * factorCantidadAlimento2;
      dia_1_alimento2.Prot = dia_1_alimento2.Prot * factorCantidadAlimento2;
      dia_1_alimento2.Grasa = dia_1_alimento2.Grasa * factorCantidadAlimento2;
      switch (factorCantidadAlimento2) {
        case 2:
          dia_1_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_2_alimento.Cals = dia_2_alimento.Cals * dia2_factorCantidadAlimento;
      dia_2_alimento.Prot = dia_2_alimento.Prot * dia2_factorCantidadAlimento;
      dia_2_alimento.Grasa = dia_2_alimento.Grasa * dia2_factorCantidadAlimento;
      switch (dia2_factorCantidadAlimento) {
        case 2:
          dia_2_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_2_alimento2.Cals = dia_2_alimento2.Cals * dia2_factorCantidadAlimento2;
      dia_2_alimento2.Prot = dia_2_alimento2.Prot * dia2_factorCantidadAlimento2;
      dia_2_alimento2.Grasa = dia_2_alimento2.Grasa * dia2_factorCantidadAlimento2;
      switch (dia2_factorCantidadAlimento2) {
        case 2:
          dia_2_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      return {
        resultado: true,
        snack: {
          primerElemento: dia_1_alimento,
          segundoElemeto: dia_1_alimento2,
        },
        snack2: {
          primerElemento: dia_2_alimento,
          segundoElemeto: dia_2_alimento2,
        },
      };
    } else {
      return {
        resultado: false,
        snack: {
          primerElemento: dia_1_alimento,
          segundoElemeto: dia_1_alimento2,
        },
        snack2: {
          primerElemento: dia_2_alimento,
          segundoElemeto: dia_2_alimento2,
        },
      };
    }
  } else if (dias === 3) {
    const dia_1_alimento = alimentos[cromosoma[0][0]];
    const dia_1_alimento2 = alimentos[cromosoma[0][1]];
    const dia_2_alimento = alimentos[cromosoma[1][0]];
    const dia_2_alimento2 = alimentos[cromosoma[1][1]];
    const dia_3_alimento = alimentos[cromosoma[2][0]];
    const dia_3_alimento2 = alimentos[cromosoma[2][1]];
    const factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const calculo_calorias = (dia_1_alimento.Cals * factorCantidadAlimento) + (dia_1_alimento2.Cals * factorCantidadAlimento2) + (dia_2_alimento.Cals * dia2_factorCantidadAlimento) + (dia_2_alimento2.Cals * dia2_factorCantidadAlimento2) + (dia_3_alimento.Cals * dia3_factorCantidadAlimento) + (dia_3_alimento2.Cals * dia3_factorCantidadAlimento2);
    const calculo_proteinas = dia_1_alimento.Prot + dia_1_alimento2.Prot + dia_2_alimento.Prot + dia_2_alimento2.Prot + dia_3_alimento.Prot + dia_3_alimento2.Prot;
    if ( calculo_calorias >= (objetivoCaloria-180) && calculo_calorias <= (objetivoCaloria+180)) {
      dia_1_alimento.Cals = dia_1_alimento.Cals * factorCantidadAlimento;
      dia_1_alimento.Prot = dia_1_alimento.Prot * factorCantidadAlimento;
      dia_1_alimento.Grasa = dia_1_alimento.Grasa * factorCantidadAlimento;
      switch (factorCantidadAlimento) {
        case 2:
          dia_1_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento2.Cals = dia_1_alimento2.Cals * factorCantidadAlimento2;
      dia_1_alimento2.Prot = dia_1_alimento2.Prot * factorCantidadAlimento2;
      dia_1_alimento2.Grasa = dia_1_alimento2.Grasa * factorCantidadAlimento2;
      switch (factorCantidadAlimento2) {
        case 2:
          dia_1_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_2_alimento.Cals = dia_2_alimento.Cals * dia2_factorCantidadAlimento;
      dia_2_alimento.Prot = dia_2_alimento.Prot * dia2_factorCantidadAlimento;
      dia_2_alimento.Grasa = dia_2_alimento.Grasa * dia2_factorCantidadAlimento;
      switch (dia2_factorCantidadAlimento) {
        case 2:
          dia_2_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_2_alimento2.Cals = dia_2_alimento2.Cals * dia2_factorCantidadAlimento2;
      dia_2_alimento2.Prot = dia_2_alimento2.Prot * dia2_factorCantidadAlimento2;
      dia_2_alimento2.Grasa = dia_2_alimento2.Grasa * dia2_factorCantidadAlimento2;
      switch (dia2_factorCantidadAlimento2) {
        case 2:
          dia_2_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_3_alimento.Cals = dia_3_alimento.Cals * dia3_factorCantidadAlimento;
      dia_3_alimento.Prot = dia_3_alimento.Prot * dia3_factorCantidadAlimento;
      dia_3_alimento.Grasa = dia_3_alimento.Grasa * dia3_factorCantidadAlimento;
      switch (dia3_factorCantidadAlimento) {
        case 2:
          dia_3_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_3_alimento.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_3_alimento2.Cals = dia_3_alimento2.Cals * dia3_factorCantidadAlimento2;
      dia_3_alimento2.Prot = dia_3_alimento2.Prot * dia3_factorCantidadAlimento2;
      dia_3_alimento2.Grasa = dia_3_alimento2.Grasa * dia3_factorCantidadAlimento2;
      switch (dia3_factorCantidadAlimento2) {
        case 2:
          dia_3_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_3_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      return {
        resultado: true,
        snack: {
          primerElemento: dia_1_alimento,
          segundoElemeto: dia_1_alimento2,
        },
        snack2: {
          primerElemento: dia_2_alimento,
          segundoElemeto: dia_2_alimento2,
        },
        snack3: {
          primerElemento: dia_3_alimento,
          segundoElemeto: dia_3_alimento2,
        },
      };
    } else {
      return {
        resultado: false,
        snack: {
          primerElemento: dia_1_alimento,
          segundoElemeto: dia_1_alimento2,
        },
        snack2: {
          primerElemento: dia_2_alimento,
          segundoElemeto: dia_2_alimento2,
        },
        snack3: {
          primerElemento: dia_3_alimento,
          segundoElemeto: dia_3_alimento2,
        },
      };
    }
  } else if (dias === 4) {
    const dia_1_alimento = alimentos[cromosoma[0][0]];
    const dia_1_alimento2 = alimentos[cromosoma[0][1]];
    const dia_2_alimento = alimentos[cromosoma[1][0]];
    const dia_2_alimento2 = alimentos[cromosoma[1][1]];
    const dia_3_alimento = alimentos[cromosoma[2][0]];
    const dia_3_alimento2 = alimentos[cromosoma[2][1]];
    const dia_4_alimento = alimentos[cromosoma[3][0]];
    const dia_4_alimento2 = alimentos[cromosoma[3][1]];
    const factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia4_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia4_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const calculo_calorias = (dia_1_alimento.Cals * factorCantidadAlimento) + (dia_1_alimento2.Cals * factorCantidadAlimento2) + (dia_2_alimento.Cals * dia2_factorCantidadAlimento) + (dia_2_alimento2.Cals * dia2_factorCantidadAlimento2) + (dia_3_alimento.Cals * dia3_factorCantidadAlimento) + (dia_3_alimento2.Cals * dia3_factorCantidadAlimento2) + (dia_4_alimento.Cals * dia4_factorCantidadAlimento) + (dia_4_alimento2.Cals * dia4_factorCantidadAlimento2);
    const calculo_proteinas = dia_1_alimento.Prot + dia_1_alimento2.Prot + dia_2_alimento.Prot + dia_2_alimento2.Prot + dia_3_alimento.Prot + dia_3_alimento2.Prot + dia_4_alimento.Prot + dia_4_alimento2.Prot;
    if ( calculo_calorias >= (objetivoCaloria-240) && calculo_calorias <= (objetivoCaloria+240)) {
      dia_1_alimento.Cals = dia_1_alimento.Cals * factorCantidadAlimento;
      dia_1_alimento.Prot = dia_1_alimento.Prot * factorCantidadAlimento;
      dia_1_alimento.Grasa = dia_1_alimento.Grasa * factorCantidadAlimento;
      switch (factorCantidadAlimento) {
        case 2:
          dia_1_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento2.Cals = dia_1_alimento2.Cals * factorCantidadAlimento2;
      dia_1_alimento2.Prot = dia_1_alimento2.Prot * factorCantidadAlimento2;
      dia_1_alimento2.Grasa = dia_1_alimento2.Grasa * factorCantidadAlimento2;
      switch (factorCantidadAlimento2) {
        case 2:
          dia_1_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_2_alimento.Cals = dia_2_alimento.Cals * dia2_factorCantidadAlimento;
      dia_2_alimento.Prot = dia_2_alimento.Prot * dia2_factorCantidadAlimento;
      dia_2_alimento.Grasa = dia_2_alimento.Grasa * dia2_factorCantidadAlimento;
      switch (dia2_factorCantidadAlimento) {
        case 2:
          dia_2_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_2_alimento2.Cals = dia_2_alimento2.Cals * dia2_factorCantidadAlimento2;
      dia_2_alimento2.Prot = dia_2_alimento2.Prot * dia2_factorCantidadAlimento2;
      dia_2_alimento2.Grasa = dia_2_alimento2.Grasa * dia2_factorCantidadAlimento2;
      switch (dia2_factorCantidadAlimento2) {
        case 2:
          dia_2_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_3_alimento.Cals = dia_3_alimento.Cals * dia3_factorCantidadAlimento;
      dia_3_alimento.Prot = dia_3_alimento.Prot * dia3_factorCantidadAlimento;
      dia_3_alimento.Grasa = dia_3_alimento.Grasa * dia3_factorCantidadAlimento;
      switch (dia3_factorCantidadAlimento) {
        case 2:
          dia_3_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_3_alimento.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_3_alimento2.Cals = dia_3_alimento2.Cals * dia3_factorCantidadAlimento2;
      dia_3_alimento2.Prot = dia_3_alimento2.Prot * dia3_factorCantidadAlimento2;
      dia_3_alimento2.Grasa = dia_3_alimento2.Grasa * dia3_factorCantidadAlimento2;
      switch (dia3_factorCantidadAlimento2) {
        case 2:
          dia_3_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_3_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_4_alimento.Cals = dia_4_alimento.Cals * dia4_factorCantidadAlimento;
      dia_4_alimento.Prot = dia_4_alimento.Prot * dia4_factorCantidadAlimento;
      dia_4_alimento.Grasa = dia_4_alimento.Grasa * dia4_factorCantidadAlimento;
      switch (dia4_factorCantidadAlimento) {
        case 2:
          dia_4_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_4_alimento.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_4_alimento2.Cals = dia_4_alimento2.Cals * dia4_factorCantidadAlimento2;
      dia_4_alimento2.Prot = dia_4_alimento2.Prot * dia4_factorCantidadAlimento2;
      dia_4_alimento2.Grasa = dia_4_alimento2.Grasa * dia4_factorCantidadAlimento2;
      switch (dia4_factorCantidadAlimento2) {
        case 2:
          dia_4_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_4_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      return {
        resultado: true,
        snack: {
          primerElemento: dia_1_alimento,
          segundoElemeto: dia_1_alimento2,
        },
        snack2: {
          primerElemento: dia_2_alimento,
          segundoElemeto: dia_2_alimento2,
        },
        snack3: {
          primerElemento: dia_3_alimento,
          segundoElemeto: dia_3_alimento2,
        },
        snack4: {
          primerElemento: dia_4_alimento,
          segundoElemeto: dia_4_alimento2,
        },
      };
    } else {
      return {
        resultado: false,
        snack: {
          primerElemento: dia_1_alimento,
          segundoElemeto: dia_1_alimento2,
        },
        snack2: {
          primerElemento: dia_2_alimento,
          segundoElemeto: dia_2_alimento2,
        },
        snack3: {
          primerElemento: dia_3_alimento,
          segundoElemeto: dia_3_alimento2,
        },
        snack4: {
          primerElemento: dia_4_alimento,
          segundoElemeto: dia_4_alimento2,
        },
      };
    }
  } else if (dias === 5) {
    const dia_1_alimento = alimentos[cromosoma[0][0]];
    const dia_1_alimento2 = alimentos[cromosoma[0][1]];
    const dia_2_alimento = alimentos[cromosoma[1][0]];
    const dia_2_alimento2 = alimentos[cromosoma[1][1]];
    const dia_3_alimento = alimentos[cromosoma[2][0]];
    const dia_3_alimento2 = alimentos[cromosoma[2][1]];
    const dia_4_alimento = alimentos[cromosoma[3][0]];
    const dia_4_alimento2 = alimentos[cromosoma[3][1]];
    const dia_5_alimento = alimentos[cromosoma[4][0]];
    const dia_5_alimento2 = alimentos[cromosoma[4][1]];
    const factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia4_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia4_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia5_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia5_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const calculo_calorias = (dia_1_alimento.Cals * factorCantidadAlimento) + (dia_1_alimento2.Cals * factorCantidadAlimento2) + (dia_2_alimento.Cals * dia2_factorCantidadAlimento) + (dia_2_alimento2.Cals * dia2_factorCantidadAlimento2) + (dia_3_alimento.Cals * dia3_factorCantidadAlimento) + (dia_3_alimento2.Cals * dia3_factorCantidadAlimento2) + (dia_4_alimento.Cals * dia4_factorCantidadAlimento) + (dia_4_alimento2.Cals * dia4_factorCantidadAlimento2) + (dia_5_alimento.Cals * dia5_factorCantidadAlimento) + (dia_5_alimento2.Cals * dia5_factorCantidadAlimento2);
    const calculo_proteinas = dia_1_alimento.Prot + dia_1_alimento2.Prot + dia_2_alimento.Prot + dia_2_alimento2.Prot + dia_3_alimento.Prot + dia_3_alimento2.Prot + dia_4_alimento.Prot + dia_4_alimento2.Prot + dia_5_alimento.Prot + dia_5_alimento2.Prot;
    if ( calculo_calorias >= (objetivoCaloria-300) && calculo_calorias <= (objetivoCaloria+300)) {
      dia_1_alimento.Cals = dia_1_alimento.Cals * factorCantidadAlimento;
      dia_1_alimento.Prot = dia_1_alimento.Prot * factorCantidadAlimento;
      dia_1_alimento.Grasa = dia_1_alimento.Grasa * factorCantidadAlimento;
      switch (factorCantidadAlimento) {
        case 2:
          dia_1_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento2.Cals = dia_1_alimento2.Cals * factorCantidadAlimento2;
      dia_1_alimento2.Prot = dia_1_alimento2.Prot * factorCantidadAlimento2;
      dia_1_alimento2.Grasa = dia_1_alimento2.Grasa * factorCantidadAlimento2;
      switch (factorCantidadAlimento2) {
        case 2:
          dia_1_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_2_alimento.Cals = dia_2_alimento.Cals * dia2_factorCantidadAlimento;
      dia_2_alimento.Prot = dia_2_alimento.Prot * dia2_factorCantidadAlimento;
      dia_2_alimento.Grasa = dia_2_alimento.Grasa * dia2_factorCantidadAlimento;
      switch (dia2_factorCantidadAlimento) {
        case 2:
          dia_2_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_2_alimento2.Cals = dia_2_alimento2.Cals * dia2_factorCantidadAlimento2;
      dia_2_alimento2.Prot = dia_2_alimento2.Prot * dia2_factorCantidadAlimento2;
      dia_2_alimento2.Grasa = dia_2_alimento2.Grasa * dia2_factorCantidadAlimento2;
      switch (dia2_factorCantidadAlimento2) {
        case 2:
          dia_2_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_3_alimento.Cals = dia_3_alimento.Cals * dia3_factorCantidadAlimento;
      dia_3_alimento.Prot = dia_3_alimento.Prot * dia3_factorCantidadAlimento;
      dia_3_alimento.Grasa = dia_3_alimento.Grasa * dia3_factorCantidadAlimento;
      switch (dia3_factorCantidadAlimento) {
        case 2:
          dia_3_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_3_alimento.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_3_alimento2.Cals = dia_3_alimento2.Cals * dia3_factorCantidadAlimento2;
      dia_3_alimento2.Prot = dia_3_alimento2.Prot * dia3_factorCantidadAlimento2;
      dia_3_alimento2.Grasa = dia_3_alimento2.Grasa * dia3_factorCantidadAlimento2;
      switch (dia3_factorCantidadAlimento2) {
        case 2:
          dia_3_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_3_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_4_alimento.Cals = dia_4_alimento.Cals * dia4_factorCantidadAlimento;
      dia_4_alimento.Prot = dia_4_alimento.Prot * dia4_factorCantidadAlimento;
      dia_4_alimento.Grasa = dia_4_alimento.Grasa * dia4_factorCantidadAlimento;
      switch (dia4_factorCantidadAlimento) {
        case 2:
          dia_4_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_4_alimento.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_4_alimento2.Cals = dia_4_alimento2.Cals * dia4_factorCantidadAlimento2;
      dia_4_alimento2.Prot = dia_4_alimento2.Prot * dia4_factorCantidadAlimento2;
      dia_4_alimento2.Grasa = dia_4_alimento2.Grasa * dia4_factorCantidadAlimento2;
      switch (dia4_factorCantidadAlimento2) {
        case 2:
          dia_4_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_4_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_5_alimento.Cals = dia_5_alimento.Cals * dia5_factorCantidadAlimento;
      dia_5_alimento.Prot = dia_5_alimento.Prot * dia5_factorCantidadAlimento;
      dia_5_alimento.Grasa = dia_5_alimento.Grasa * dia5_factorCantidadAlimento;
      switch (dia5_factorCantidadAlimento) {
        case 2:
          dia_5_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_5_alimento.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_5_alimento2.Cals = dia_5_alimento2.Cals * dia5_factorCantidadAlimento2;
      dia_5_alimento2.Prot = dia_5_alimento2.Prot * dia5_factorCantidadAlimento2;
      dia_5_alimento2.Grasa = dia_5_alimento2.Grasa * dia5_factorCantidadAlimento2;
      switch (dia5_factorCantidadAlimento2) {
        case 2:
          dia_5_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_5_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      return {
        resultado: true,
        snack: {
          primerElemento: dia_1_alimento,
          segundoElemeto: dia_1_alimento2,
        },
        snack2: {
          primerElemento: dia_2_alimento,
          segundoElemeto: dia_2_alimento2,
        },
        snack3: {
          primerElemento: dia_3_alimento,
          segundoElemeto: dia_3_alimento2,
        },
        snack4: {
          primerElemento: dia_4_alimento,
          segundoElemeto: dia_4_alimento2,
        },
        snack5: {
          primerElemento: dia_5_alimento,
          segundoElemeto: dia_5_alimento2,
        },
      };
    } else {
      return {
        resultado: false,
        snack: {
          primerElemento: dia_1_alimento,
          segundoElemeto: dia_1_alimento2,
        },
        snack2: {
          primerElemento: dia_2_alimento,
          segundoElemeto: dia_2_alimento2,
        },
        snack3: {
          primerElemento: dia_3_alimento,
          segundoElemeto: dia_3_alimento2,
        },
        snack4: {
          primerElemento: dia_4_alimento,
          segundoElemeto: dia_4_alimento2,
        },
        snack5: {
          primerElemento: dia_5_alimento,
          segundoElemeto: dia_5_alimento2,
        },
      };
    }
  } else if (dias === 6) {
    const dia_1_alimento = alimentos[cromosoma[0][0]];
    const dia_1_alimento2 = alimentos[cromosoma[0][1]];
    const dia_2_alimento = alimentos[cromosoma[1][0]];
    const dia_2_alimento2 = alimentos[cromosoma[1][1]];
    const dia_3_alimento = alimentos[cromosoma[2][0]];
    const dia_3_alimento2 = alimentos[cromosoma[2][1]];
    const dia_4_alimento = alimentos[cromosoma[3][0]];
    const dia_4_alimento2 = alimentos[cromosoma[3][1]];
    const dia_5_alimento = alimentos[cromosoma[4][0]];
    const dia_5_alimento2 = alimentos[cromosoma[4][1]];
    const dia_6_alimento = alimentos[cromosoma[5][0]];
    const dia_6_alimento2 = alimentos[cromosoma[5][1]];
    const factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia2_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia3_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia4_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia4_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia5_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia5_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const dia6_factorCantidadAlimento = Math.floor(Math.random() * 3) + 1;
    const dia6_factorCantidadAlimento2 = Math.floor(Math.random() * 3) + 1;
    const calculo_calorias = (dia_1_alimento.Cals * factorCantidadAlimento) + (dia_1_alimento2.Cals * factorCantidadAlimento2) + (dia_2_alimento.Cals * dia2_factorCantidadAlimento) + (dia_2_alimento2.Cals * dia2_factorCantidadAlimento2) + (dia_3_alimento.Cals * dia3_factorCantidadAlimento) + (dia_3_alimento2.Cals * dia3_factorCantidadAlimento2) + (dia_4_alimento.Cals * dia4_factorCantidadAlimento) + (dia_4_alimento2.Cals * dia4_factorCantidadAlimento2) + (dia_5_alimento.Cals * dia5_factorCantidadAlimento) + (dia_5_alimento2.Cals * dia5_factorCantidadAlimento2) + (dia_6_alimento.Cals * dia6_factorCantidadAlimento) + (dia_6_alimento2.Cals * dia6_factorCantidadAlimento2);
    const calculo_proteinas = dia_1_alimento.Prot + dia_1_alimento2.Prot + dia_2_alimento.Prot + dia_2_alimento2.Prot + dia_3_alimento.Prot + dia_3_alimento2.Prot + dia_4_alimento.Prot + dia_4_alimento2.Prot + dia_5_alimento.Prot + dia_5_alimento2.Prot + dia_6_alimento.Prot + dia_6_alimento2.Prot;
    if ( calculo_calorias >= (objetivoCaloria-360) && calculo_calorias <= (objetivoCaloria+360)) {
      dia_1_alimento.Cals = dia_1_alimento.Cals * factorCantidadAlimento;
      dia_1_alimento.Prot = dia_1_alimento.Prot * factorCantidadAlimento;
      dia_1_alimento.Grasa = dia_1_alimento.Grasa * factorCantidadAlimento;
      switch (factorCantidadAlimento) {
        case 2:
          dia_1_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento2.Cals = dia_1_alimento2.Cals * factorCantidadAlimento2;
      dia_1_alimento2.Prot = dia_1_alimento2.Prot * factorCantidadAlimento2;
      dia_1_alimento2.Grasa = dia_1_alimento2.Grasa * factorCantidadAlimento2;
      switch (factorCantidadAlimento2) {
        case 2:
          dia_1_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_2_alimento.Cals = dia_2_alimento.Cals * dia2_factorCantidadAlimento;
      dia_2_alimento.Prot = dia_2_alimento.Prot * dia2_factorCantidadAlimento;
      dia_2_alimento.Grasa = dia_2_alimento.Grasa * dia2_factorCantidadAlimento;
      switch (dia2_factorCantidadAlimento) {
        case 2:
          dia_2_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_2_alimento2.Cals = dia_2_alimento2.Cals * dia2_factorCantidadAlimento2;
      dia_2_alimento2.Prot = dia_2_alimento2.Prot * dia2_factorCantidadAlimento2;
      dia_2_alimento2.Grasa = dia_2_alimento2.Grasa * dia2_factorCantidadAlimento2;
      switch (dia2_factorCantidadAlimento2) {
        case 2:
          dia_2_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_3_alimento.Cals = dia_3_alimento.Cals * dia3_factorCantidadAlimento;
      dia_3_alimento.Prot = dia_3_alimento.Prot * dia3_factorCantidadAlimento;
      dia_3_alimento.Grasa = dia_3_alimento.Grasa * dia3_factorCantidadAlimento;
      switch (dia3_factorCantidadAlimento) {
        case 2:
          dia_3_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_3_alimento.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_3_alimento2.Cals = dia_3_alimento2.Cals * dia3_factorCantidadAlimento2;
      dia_3_alimento2.Prot = dia_3_alimento2.Prot * dia3_factorCantidadAlimento2;
      dia_3_alimento2.Grasa = dia_3_alimento2.Grasa * dia3_factorCantidadAlimento2;
      switch (dia3_factorCantidadAlimento2) {
        case 2:
          dia_3_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_3_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_4_alimento.Cals = dia_4_alimento.Cals * dia4_factorCantidadAlimento;
      dia_4_alimento.Prot = dia_4_alimento.Prot * dia4_factorCantidadAlimento;
      dia_4_alimento.Grasa = dia_4_alimento.Grasa * dia4_factorCantidadAlimento;
      switch (dia4_factorCantidadAlimento) {
        case 2:
          dia_4_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_4_alimento.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_4_alimento2.Cals = dia_4_alimento2.Cals * dia4_factorCantidadAlimento2;
      dia_4_alimento2.Prot = dia_4_alimento2.Prot * dia4_factorCantidadAlimento2;
      dia_4_alimento2.Grasa = dia_4_alimento2.Grasa * dia4_factorCantidadAlimento2;
      switch (dia4_factorCantidadAlimento2) {
        case 2:
          dia_4_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_4_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_5_alimento.Cals = dia_5_alimento.Cals * dia5_factorCantidadAlimento;
      dia_5_alimento.Prot = dia_5_alimento.Prot * dia5_factorCantidadAlimento;
      dia_5_alimento.Grasa = dia_5_alimento.Grasa * dia5_factorCantidadAlimento;
      switch (dia5_factorCantidadAlimento) {
        case 2:
          dia_5_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_5_alimento.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_5_alimento2.Cals = dia_5_alimento2.Cals * dia5_factorCantidadAlimento2;
      dia_5_alimento2.Prot = dia_5_alimento2.Prot * dia5_factorCantidadAlimento2;
      dia_5_alimento2.Grasa = dia_5_alimento2.Grasa * dia5_factorCantidadAlimento2;
      switch (dia5_factorCantidadAlimento2) {
        case 2:
          dia_5_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_5_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_6_alimento.Cals = dia_6_alimento.Cals * dia6_factorCantidadAlimento;
      dia_6_alimento.Prot = dia_6_alimento.Prot * dia6_factorCantidadAlimento;
      dia_6_alimento.Grasa = dia_6_alimento.Grasa * dia6_factorCantidadAlimento;
      switch (dia6_factorCantidadAlimento) {
        case 2:
          dia_6_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_6_alimento.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_6_alimento2.Cals = dia_6_alimento2.Cals * dia6_factorCantidadAlimento2;
      dia_6_alimento2.Prot = dia_6_alimento2.Prot * dia6_factorCantidadAlimento2;
      dia_6_alimento2.Grasa = dia_6_alimento2.Grasa * dia6_factorCantidadAlimento2;
      switch (dia6_factorCantidadAlimento2) {
        case 2:
          dia_6_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_6_alimento2.cantidad = "300 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      return {
        resultado: true,
        snack: {
          primerElemento: dia_1_alimento,
          segundoElemeto: dia_1_alimento2,
        },
        snack2: {
          primerElemento: dia_2_alimento,
          segundoElemeto: dia_2_alimento2,
        },
        snack3: {
          primerElemento: dia_3_alimento,
          segundoElemeto: dia_3_alimento2,
        },
        snack4: {
          primerElemento: dia_4_alimento,
          segundoElemeto: dia_4_alimento2,
        },
        snack5: {
          primerElemento: dia_5_alimento,
          segundoElemeto: dia_5_alimento2,
        },
        snack6: {
          primerElemento: dia_6_alimento,
          segundoElemeto: dia_6_alimento2,
        },
      };
    } else {
      return {
        resultado: false,
        snack: {
          primerElemento: dia_1_alimento,
          segundoElemeto: dia_1_alimento2,
        },
        snack2: {
          primerElemento: dia_2_alimento,
          segundoElemeto: dia_2_alimento2,
        },
        snack3: {
          primerElemento: dia_3_alimento,
          segundoElemeto: dia_3_alimento2,
        },
        snack4: {
          primerElemento: dia_4_alimento,
          segundoElemeto: dia_4_alimento2,
        },
        snack5: {
          primerElemento: dia_5_alimento,
          segundoElemeto: dia_5_alimento2,
        },
        snack6: {
          primerElemento: dia_6_alimento,
          segundoElemeto: dia_6_alimento2,
        },
      };
    }
  } else if (dias === 7) {
    const dia_1_alimento = alimentos[cromosoma[0][0]];
    const dia_1_alimento2 = alimentos[cromosoma[0][1]];
    const dia_2_alimento = alimentos[cromosoma[1][0]];
    const dia_2_alimento2 = alimentos[cromosoma[1][1]];
    const dia_3_alimento = alimentos[cromosoma[2][0]];
    const dia_3_alimento2 = alimentos[cromosoma[2][1]];
    const dia_4_alimento = alimentos[cromosoma[3][0]];
    const dia_4_alimento2 = alimentos[cromosoma[3][1]];
    const dia_5_alimento = alimentos[cromosoma[4][0]];
    const dia_5_alimento2 = alimentos[cromosoma[4][1]];
    const dia_6_alimento = alimentos[cromosoma[5][0]];
    const dia_6_alimento2 = alimentos[cromosoma[5][1]];
    const dia_7_alimento = alimentos[cromosoma[6][0]];
    const dia_7_alimento2 = alimentos[cromosoma[6][1]];
    const factorCantidadAlimento = Math.floor(Math.random() * 4) + 1;
    const factorCantidadAlimento2 = Math.floor(Math.random() * 4) + 1;
    const dia2_factorCantidadAlimento = Math.floor(Math.random() * 4) + 1;
    const dia2_factorCantidadAlimento2 = Math.floor(Math.random() * 4) + 1;
    const dia3_factorCantidadAlimento = Math.floor(Math.random() * 4) + 1;
    const dia3_factorCantidadAlimento2 = Math.floor(Math.random() * 4) + 1;
    const dia4_factorCantidadAlimento = Math.floor(Math.random() * 4) + 1;
    const dia4_factorCantidadAlimento2 = Math.floor(Math.random() * 4) + 1;
    const dia5_factorCantidadAlimento = Math.floor(Math.random() * 4) + 1;
    const dia5_factorCantidadAlimento2 = Math.floor(Math.random() * 4) + 1;
    const dia6_factorCantidadAlimento = Math.floor(Math.random() * 4) + 1;
    const dia6_factorCantidadAlimento2 = Math.floor(Math.random() * 4) + 1;
    const dia7_factorCantidadAlimento = Math.floor(Math.random() * 4) + 1;
    const dia7_factorCantidadAlimento2 = Math.floor(Math.random() * 4) + 1;
    const calculo_calorias = (dia_1_alimento.Cals * factorCantidadAlimento) + (dia_1_alimento2.Cals * factorCantidadAlimento2) + (dia_2_alimento.Cals * dia2_factorCantidadAlimento) + (dia_2_alimento2.Cals * dia2_factorCantidadAlimento2) + (dia_3_alimento.Cals * dia3_factorCantidadAlimento) + (dia_3_alimento2.Cals * dia3_factorCantidadAlimento2) + (dia_4_alimento.Cals * dia4_factorCantidadAlimento) + (dia_4_alimento2.Cals * dia4_factorCantidadAlimento2) + (dia_5_alimento.Cals * dia5_factorCantidadAlimento) + (dia_5_alimento2.Cals * dia5_factorCantidadAlimento2) + (dia_6_alimento.Cals * dia6_factorCantidadAlimento) + (dia_6_alimento2.Cals * dia6_factorCantidadAlimento2) + (dia_7_alimento.Cals * dia7_factorCantidadAlimento) + (dia_7_alimento2.Cals * dia7_factorCantidadAlimento2);
    const calculo_proteinas = dia_1_alimento.Prot + dia_1_alimento2.Prot + dia_2_alimento.Prot + dia_2_alimento2.Prot + dia_3_alimento.Prot + dia_3_alimento2.Prot + dia_4_alimento.Prot + dia_4_alimento2.Prot + dia_5_alimento.Prot + dia_5_alimento2.Prot + dia_6_alimento.Prot + dia_6_alimento2.Prot + dia_7_alimento.Prot + dia_7_alimento2.Prot;
    if ( calculo_calorias >= (objetivoCaloria-420) && calculo_calorias <= (objetivoCaloria+420)) {
      dia_1_alimento.Cals = dia_1_alimento.Cals * factorCantidadAlimento;
      dia_1_alimento.Prot = dia_1_alimento.Prot * factorCantidadAlimento;
      dia_1_alimento.Grasa = dia_1_alimento.Grasa * factorCantidadAlimento;
      switch (factorCantidadAlimento) {
        case 2:
          dia_1_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento.cantidad = "300 g";
          break;
        case 4:
          dia_1_alimento.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_1_alimento2.Cals = dia_1_alimento2.Cals * factorCantidadAlimento2;
      dia_1_alimento2.Prot = dia_1_alimento2.Prot * factorCantidadAlimento2;
      dia_1_alimento2.Grasa = dia_1_alimento2.Grasa * factorCantidadAlimento2;
      switch (factorCantidadAlimento2) {
        case 2:
          dia_1_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_1_alimento2.cantidad = "300 g";
          break;
        case 4:
          dia_1_alimento2.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_2_alimento.Cals = dia_2_alimento.Cals * dia2_factorCantidadAlimento;
      dia_2_alimento.Prot = dia_2_alimento.Prot * dia2_factorCantidadAlimento;
      dia_2_alimento.Grasa = dia_2_alimento.Grasa * dia2_factorCantidadAlimento;
      switch (dia2_factorCantidadAlimento) {
        case 2:
          dia_2_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento.cantidad = "300 g";
          break;
        case 4:
          dia_2_alimento.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_2_alimento2.Cals = dia_2_alimento2.Cals * dia2_factorCantidadAlimento2;
      dia_2_alimento2.Prot = dia_2_alimento2.Prot * dia2_factorCantidadAlimento2;
      dia_2_alimento2.Grasa = dia_2_alimento2.Grasa * dia2_factorCantidadAlimento2;
      switch (dia2_factorCantidadAlimento2) {
        case 2:
          dia_2_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_2_alimento2.cantidad = "300 g";
          break;
        case 4:
          dia_2_alimento2.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_3_alimento.Cals = dia_3_alimento.Cals * dia3_factorCantidadAlimento;
      dia_3_alimento.Prot = dia_3_alimento.Prot * dia3_factorCantidadAlimento;
      dia_3_alimento.Grasa = dia_3_alimento.Grasa * dia3_factorCantidadAlimento;
      switch (dia3_factorCantidadAlimento) {
        case 2:
          dia_3_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_3_alimento.cantidad = "300 g";
          break;
        case 4:
          dia_3_alimento.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_3_alimento2.Cals = dia_3_alimento2.Cals * dia3_factorCantidadAlimento2;
      dia_3_alimento2.Prot = dia_3_alimento2.Prot * dia3_factorCantidadAlimento2;
      dia_3_alimento2.Grasa = dia_3_alimento2.Grasa * dia3_factorCantidadAlimento2;
      switch (dia3_factorCantidadAlimento2) {
        case 2:
          dia_3_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_3_alimento2.cantidad = "300 g";
          break;
        case 4:
          dia_3_alimento2.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_4_alimento.Cals = dia_4_alimento.Cals * dia4_factorCantidadAlimento;
      dia_4_alimento.Prot = dia_4_alimento.Prot * dia4_factorCantidadAlimento;
      dia_4_alimento.Grasa = dia_4_alimento.Grasa * dia4_factorCantidadAlimento;
      switch (dia4_factorCantidadAlimento) {
        case 2:
          dia_4_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_4_alimento.cantidad = "300 g";
          break;
        case 4:
          dia_4_alimento.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_4_alimento2.Cals = dia_4_alimento2.Cals * dia4_factorCantidadAlimento2;
      dia_4_alimento2.Prot = dia_4_alimento2.Prot * dia4_factorCantidadAlimento2;
      dia_4_alimento2.Grasa = dia_4_alimento2.Grasa * dia4_factorCantidadAlimento2;
      switch (dia4_factorCantidadAlimento2) {
        case 2:
          dia_4_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_4_alimento2.cantidad = "300 g";
          break;
        case 4:
          dia_4_alimento2.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_5_alimento.Cals = dia_5_alimento.Cals * dia5_factorCantidadAlimento;
      dia_5_alimento.Prot = dia_5_alimento.Prot * dia5_factorCantidadAlimento;
      dia_5_alimento.Grasa = dia_5_alimento.Grasa * dia5_factorCantidadAlimento;
      switch (dia5_factorCantidadAlimento) {
        case 2:
          dia_5_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_5_alimento.cantidad = "300 g";
          break;
        case 4:
          dia_5_alimento.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_5_alimento2.Cals = dia_5_alimento2.Cals * dia5_factorCantidadAlimento2;
      dia_5_alimento2.Prot = dia_5_alimento2.Prot * dia5_factorCantidadAlimento2;
      dia_5_alimento2.Grasa = dia_5_alimento2.Grasa * dia5_factorCantidadAlimento2;
      switch (dia5_factorCantidadAlimento2) {
        case 2:
          dia_5_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_5_alimento2.cantidad = "300 g";
          break;
        case 4:
          dia_5_alimento2.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_6_alimento.Cals = dia_6_alimento.Cals * dia6_factorCantidadAlimento;
      dia_6_alimento.Prot = dia_6_alimento.Prot * dia6_factorCantidadAlimento;
      dia_6_alimento.Grasa = dia_6_alimento.Grasa * dia6_factorCantidadAlimento;
      switch (dia6_factorCantidadAlimento) {
        case 2:
          dia_6_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_6_alimento.cantidad = "300 g";
          break;
        case 4:
          dia_6_alimento.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_6_alimento2.Cals = dia_6_alimento2.Cals * dia6_factorCantidadAlimento2;
      dia_6_alimento2.Prot = dia_6_alimento2.Prot * dia6_factorCantidadAlimento2;
      dia_6_alimento2.Grasa = dia_6_alimento2.Grasa * dia6_factorCantidadAlimento2;
      switch (dia6_factorCantidadAlimento2) {
        case 2:
          dia_6_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_6_alimento2.cantidad = "300 g";
          break;
        case 4:
          dia_6_alimento2.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }

      dia_7_alimento.Cals = dia_7_alimento.Cals * dia7_factorCantidadAlimento;
      dia_7_alimento.Prot = dia_7_alimento.Prot * dia7_factorCantidadAlimento;
      dia_7_alimento.Grasa = dia_7_alimento.Grasa * dia7_factorCantidadAlimento;
      switch (dia7_factorCantidadAlimento) {
        case 2:
          dia_7_alimento.cantidad = "200 g";
          break;
        case 3:
          dia_7_alimento.cantidad = "300 g";
          break;
        case 4:
          dia_7_alimento.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      dia_7_alimento2.Cals = dia_7_alimento2.Cals * dia7_factorCantidadAlimento2;
      dia_7_alimento2.Prot = dia_7_alimento2.Prot * dia7_factorCantidadAlimento2;
      dia_7_alimento2.Grasa = dia_7_alimento2.Grasa * dia7_factorCantidadAlimento2;
      switch (dia7_factorCantidadAlimento2) {
        case 2:
          dia_7_alimento2.cantidad = "200 g";
          break;
        case 3:
          dia_7_alimento2.cantidad = "300 g";
          break;
        case 4:
          dia_7_alimento2.cantidad = "400 g";
          break;
        default:
          console.log("la unidad es 1");
      }
      return {
        resultado: true,
        snack: {
          primerElemento: dia_1_alimento,
          segundoElemeto: dia_1_alimento2,
        },
        snack2: {
          primerElemento: dia_2_alimento,
          segundoElemeto: dia_2_alimento2,
        },
        snack3: {
          primerElemento: dia_3_alimento,
          segundoElemeto: dia_3_alimento2,
        },
        snack4: {
          primerElemento: dia_4_alimento,
          segundoElemeto: dia_4_alimento2,
        },
        snack5: {
          primerElemento: dia_5_alimento,
          segundoElemeto: dia_5_alimento2,
        },
        snack6: {
          primerElemento: dia_6_alimento,
          segundoElemeto: dia_6_alimento2,
        },
        snack7: {
          primerElemento: dia_7_alimento,
          segundoElemeto: dia_7_alimento2,
        },
      };
    } else {
      return {
        resultado: false,
        snack: {
          primerElemento: dia_1_alimento,
          segundoElemeto: dia_1_alimento2,
        },
        snack2: {
          primerElemento: dia_2_alimento,
          segundoElemeto: dia_2_alimento2,
        },
        snack3: {
          primerElemento: dia_3_alimento,
          segundoElemeto: dia_3_alimento2,
        },
        snack4: {
          primerElemento: dia_4_alimento,
          segundoElemeto: dia_4_alimento2,
        },
        snack5: {
          primerElemento: dia_5_alimento,
          segundoElemeto: dia_5_alimento2,
        },
        snack6: {
          primerElemento: dia_6_alimento,
          segundoElemeto: dia_6_alimento2,
        },
        snack7: {
          primerElemento: dia_7_alimento,
          segundoElemeto: dia_7_alimento2,
        },
      };
    }
  }
};

const funcionFitnes1Dia = (cromosoma, recetas, objetivoCaloria, ObjetivoProteina) => {
  const dia_1 = recetas[cromosoma[0]];
  const calculo_calorias = dia_1.cal;
  const calculo_proteinas = dia_1.proteína;
  console.log("Resultado de calorias de cromosoma:" + calculo_calorias);
  console.log("Resultado de calorias de cromosoma:" + calculo_proteinas);
  console.log(calculo_proteinas >= (ObjetivoProteina-20) && calculo_proteinas <= (ObjetivoProteina+20) && calculo_calorias >= (objetivoCaloria-20) && calculo_calorias <= (objetivoCaloria+20));
  if (calculo_proteinas >= (ObjetivoProteina-20) && calculo_proteinas <= (ObjetivoProteina+20) && calculo_calorias >= (objetivoCaloria-20) && calculo_calorias <= (objetivoCaloria+20)) {
    return {
      resultado: true,
      lunes: dia_1,
    };
  }
  return {
    resultado: false,
    lunes: dia_1,
  };
};

const funcionFitnes2Dia = (cromosoma, recetas_1, recetas_2, objetivoCaloria, ObjetivoProteina) => {
  const dia_1 = recetas_1[cromosoma[0]];
  const dia_2 = recetas_2[cromosoma[1]];
  const calculo_calorias = dia_1.cal + dia_2.cal;
  const calculo_proteinas = dia_1.proteína + dia_2.proteína;
  console.log("Resultado de calorias de cromosoma:" + calculo_calorias);
  console.log("Resultado de calorias de cromosoma:" + calculo_proteinas);
  if (calculo_proteinas >= (ObjetivoProteina-50) && calculo_proteinas <= (ObjetivoProteina+50) && calculo_calorias >= (objetivoCaloria-50) && calculo_calorias <= (objetivoCaloria+50)) {
    return {
      resultado: true,
      lunes: dia_1,
      martes: dia_2,
    };
  } else {
    return {
      resultado: false,
      lunes: dia_1,
      martes: dia_2,
    };
  }
};

const funcionFitnes3Dia = (cromosoma, recetas_1, recetas_2, recetas_3, objetivoCaloria, ObjetivoProteina) => {
  const dia_1 = recetas_1[cromosoma[0]];
  const dia_2 = recetas_2[cromosoma[1]];
  const dia_3 = recetas_3[cromosoma[2]];
  const calculo_calorias = dia_1.cal + dia_2.cal + dia_3.cal;
  const calculo_proteinas = dia_1.proteína + dia_2.proteína + dia_3.proteína;
  console.log("Resultado de calorias de cromosoma:" + calculo_calorias);
  console.log("Resultado de calorias de cromosoma:" + calculo_proteinas);
  if (calculo_proteinas >= (ObjetivoProteina-50) && calculo_proteinas <= (ObjetivoProteina+50) && calculo_calorias >= (objetivoCaloria-50) && calculo_calorias <= (objetivoCaloria+50)) {
    return {
      resultado: true,
      lunes: dia_1,
      martes: dia_2,
      miercoles: dia_3,
    };
  } else {
    return {
      resultado: false,
      lunes: dia_1,
      martes: dia_2,
      miercoles: dia_3,
    };
  }
};

const funcionFitnes4Dia = (cromosoma, recetas_1, recetas_2, recetas_3, recetas_4, objetivoCaloria, ObjetivoProteina) => {
  const dia_1 = recetas_1[cromosoma[0]];
  const dia_2 = recetas_2[cromosoma[1]];
  const dia_3 = recetas_3[cromosoma[2]];
  const dia_4 = recetas_4[cromosoma[3]];
  const calculo_calorias = dia_1.cal + dia_2.cal + dia_3.cal + dia_4.cal;
  const calculo_proteinas = dia_1.proteína + dia_2.proteína + dia_3.proteína + dia_4.proteína;
  console.log("Resultado de calorias de cromosoma:" + calculo_calorias);
  console.log("Resultado de calorias de cromosoma:" + calculo_proteinas);
  if (calculo_proteinas >= (ObjetivoProteina-50) && calculo_proteinas <= (ObjetivoProteina+50) && calculo_calorias >= (objetivoCaloria-50) && calculo_calorias <= (objetivoCaloria+50)) {
    return {
      resultado: true,
      lunes: dia_1,
      martes: dia_2,
      miercoles: dia_3,
      jueves: dia_4,
    };
  } else {
    return {
      resultado: false,
      lunes: dia_1,
      martes: dia_2,
      miercoles: dia_3,
      jueves: dia_4,
    };
  }
};

const funcionFitnes5Dia = (cromosoma, recetas_1, recetas_2, recetas_3, recetas_4, recetas_5, objetivoCaloria, ObjetivoProteina) => {
  const dia_1 = recetas_1[cromosoma[0]];
  const dia_2 = recetas_2[cromosoma[1]];
  const dia_3 = recetas_3[cromosoma[2]];
  const dia_4 = recetas_4[cromosoma[3]];
  const dia_5 = recetas_5[cromosoma[4]];
  const calculo_calorias = dia_1.cal + dia_2.cal + dia_3.cal + dia_4.cal + dia_5.cal;
  const calculo_proteinas = dia_1.proteína + dia_2.proteína + dia_3.proteína + dia_4.proteína + dia_5.proteína;
  console.log("Resultado de calorias de cromosoma:" + calculo_calorias);
  console.log("Resultado de calorias de cromosoma:" + calculo_proteinas);
  if (calculo_proteinas >= (ObjetivoProteina-50) && calculo_proteinas <= (ObjetivoProteina+50) && calculo_calorias >= (objetivoCaloria-50) && calculo_calorias <= (objetivoCaloria+50)) {
    return {
      resultado: true,
      lunes: dia_1,
      martes: dia_2,
      miercoles: dia_3,
      jueves: dia_4,
      viernes: dia_5,
    };
  } else {
    return {
      resultado: false,
      lunes: dia_1,
      martes: dia_2,
      miercoles: dia_3,
      jueves: dia_4,
      viernes: dia_5,
    };
  }
};

const funcionFitnes6Dia = (cromosoma, recetas_1, recetas_2, recetas_3, recetas_4, recetas_5, recetas_6, objetivoCaloria, ObjetivoProteina) => {
  const dia_1 = recetas_1[cromosoma[0]];
  const dia_2 = recetas_2[cromosoma[1]];
  const dia_3 = recetas_3[cromosoma[2]];
  const dia_4 = recetas_4[cromosoma[3]];
  const dia_5 = recetas_5[cromosoma[4]];
  const dia_6 = recetas_6[cromosoma[5]];
  const calculo_calorias = dia_1.cal + dia_2.cal + dia_3.cal + dia_4.cal + dia_5.cal + dia_6.cal;
  const calculo_proteinas = dia_1.proteína + dia_2.proteína + dia_3.proteína + dia_4.proteína + dia_5.proteína + dia_6.proteína;
  console.log("Resultado de calorias de cromosoma:" + calculo_calorias);
  console.log("Resultado de calorias de cromosoma:" + calculo_proteinas);
  if (calculo_proteinas >= (ObjetivoProteina-50) && calculo_proteinas <= (ObjetivoProteina+50) && calculo_calorias >= (objetivoCaloria-50) && calculo_calorias <= (objetivoCaloria+50)) {
    return {
      resultado: true,
      lunes: dia_1,
      martes: dia_2,
      miercoles: dia_3,
      jueves: dia_4,
      viernes: dia_5,
      sabado: dia_6,
    };
  } else {
    return {
      resultado: false,
      lunes: dia_1,
      martes: dia_2,
      miercoles: dia_3,
      jueves: dia_4,
      viernes: dia_5,
      sabado: dia_6,
    };
  }
};


const funcionFitnes7Dia = (cromosoma, recetas_1, recetas_2, recetas_3, recetas_4, recetas_5, recetas_6, recetas_7, objetivoCaloria, ObjetivoProteina) => {
  const dia_1 = recetas_1[cromosoma[0]];
  const dia_2 = recetas_2[cromosoma[1]];
  const dia_3 = recetas_3[cromosoma[2]];
  const dia_4 = recetas_4[cromosoma[3]];
  const dia_5 = recetas_5[cromosoma[4]];
  const dia_6 = recetas_6[cromosoma[5]];
  const dia_7 = recetas_7[cromosoma[6]];
  const calculo_calorias = dia_1.cal + dia_2.cal + dia_3.cal + dia_4.cal + dia_5.cal+ dia_6.cal+ dia_7.cal;
  const calculo_proteinas = dia_1.proteína + dia_2.proteína + dia_3.proteína + dia_4.proteína + dia_5.proteína + dia_6.proteína + dia_7.proteína;
  console.log("Resultado de calorias de cromosoma:" + calculo_calorias);
  console.log("Resultado de calorias de cromosoma:" + calculo_proteinas);
  if (calculo_proteinas >= (ObjetivoProteina-50) && calculo_proteinas <= (ObjetivoProteina+50) && calculo_calorias >= (objetivoCaloria-50) && calculo_calorias <= (objetivoCaloria+50)) {
    return {
      resultado: true,
      lunes: dia_1,
      martes: dia_2,
      miercoles: dia_3,
      jueves: dia_4,
      viernes: dia_5,
      sabado: dia_6,
      domingo: dia_7,
    };
  } else {
    return {
      resultado: false,
      lunes: dia_1,
      martes: dia_2,
      miercoles: dia_3,
      jueves: dia_4,
      viernes: dia_5,
      sabado: dia_6,
      domingo: dia_7,
    };
  }
};

const db = admin.firestore();


app.post("/AlgorithmGenetics", async (req, res) => {
  console.log("-----------------------Empezo la funcion -----------------------");
  console.log("reques body recibido: ", req.body);
  if (req.body.idUser && req.body.dias && req.body.caloriaObjetivo) {
    if (req.body.proteinaObjetivo) {
      const recetas = [];
      let cromosomas = [];
      const temp = true;
      let resulatdoFitnes = null;
      await db.collection("PruebaRecetas").get().then((res) => {
        res.forEach((data) => {
          recetas.push(data.data());
        });
      });

      if (req.body.dias === 1) {
        for (let i = 0; i < 70; i++) {
          cromosomas.push([Math.floor(Math.random() * 70)]);
        }
        while (temp) {
          for (const temp of cromosomas) {
            resulatdoFitnes = funcionFitnes1Dia(temp, recetas, req.body.caloriaObjetivo, req.body.proteinaObjetivo, req.body.dias);
            if (resulatdoFitnes.resultado === true) {
              console.log("-------------------entre--------------");
              db.collection("Menus").add({
                idUser: req.body.idUser,
                FechaCreacion: (new Date()),
                Recetas: [resulatdoFitnes.lunes],
              });
              break;
            }
          }
          if (resulatdoFitnes.resultado === true) {
            break;
          }
        }
        res.status(200).json(
            resulatdoFitnes);
      } else if (req.body.dias === 2) {
        const receta_col1 = recetas.slice(0, 35);
        const receta_col2 = recetas.slice(35, 70);
        for (let i = 0; i < 70; i++) {
          cromosomas.push([Math.floor(Math.random() * 35), Math.floor(Math.random() * 35)]);
        }

        while (temp) {
          for (const temp of cromosomas) {
            resulatdoFitnes = funcionFitnes2Dia(temp, receta_col1, receta_col2, req.body.caloriaObjetivo, req.body.proteinaObjetivo, req.body.dias);
            if (resulatdoFitnes.resultado === true) {
              console.log("-------------------entre--------------");
              db.collection("Menus").add({
                idUser: req.body.idUser,
                FechaCreacion: (new Date()),
                Recetas: [resulatdoFitnes.lunes, resulatdoFitnes.martes],
              });
              break;
            }
          }
          if (resulatdoFitnes.resultado === true) {
            break;
          }
          cromosomas = CM(cromosomas, req.body.dias);
        }
        res.status(200).json(
            resulatdoFitnes);
      } else if (req.body.dias === 3) {
        const receta_col1 = recetas.slice(0, 23);
        const receta_col2 = recetas.slice(23, 46);
        const receta_col3 = recetas.slice(46, 69);
        for (let i = 0; i < 70; i++) {
          cromosomas.push([Math.floor(Math.random() * 23), Math.floor(Math.random() * 23), Math.floor(Math.random() * 23)]);
        }
        while (temp) {
          for (const temp of cromosomas) {
            resulatdoFitnes = funcionFitnes3Dia(temp, receta_col1, receta_col2, receta_col3, req.body.caloriaObjetivo, req.body.proteinaObjetivo, req.body.dias);
            if (resulatdoFitnes.resultado === true) {
              console.log("-------------------entre--------------");
              db.collection("Menus").add({
                idUser: req.body.idUser,
                FechaCreacion: (new Date()),
                Recetas: [resulatdoFitnes.lunes, resulatdoFitnes.martes, resulatdoFitnes.miercoles],
              });
              break;
            }
          }
          if (resulatdoFitnes.resultado === true) {
            break;
          }
          cromosomas = CM(cromosomas, req.body.dias);
        }
        res.status(200).json(
            resulatdoFitnes);
      } else if (req.body.dias === 4) {
        const receta_col1 = recetas.slice(0, 17);
        const receta_col2 = recetas.slice(17, 34);
        const receta_col3 = recetas.slice(34, 51);
        const receta_col4 = recetas.slice(51, 68);
        for (let i = 0; i < 70; i++) {
          cromosomas.push([Math.floor(Math.random() * 17), Math.floor(Math.random() * 17), Math.floor(Math.random() * 17), Math.floor(Math.random() * 17)]);
        }
        while (temp) {
          for (const temp of cromosomas) {
            resulatdoFitnes = funcionFitnes4Dia(temp, receta_col1, receta_col2, receta_col3, receta_col4, req.body.caloriaObjetivo, req.body.proteinaObjetivo, req.body.dias);
            if (resulatdoFitnes.resultado === true) {
              console.log("-------------------entre--------------");
              db.collection("Menus").add({
                idUser: req.body.idUser,
                FechaCreacion: (new Date()),
                Recetas: [resulatdoFitnes.lunes, resulatdoFitnes.martes, resulatdoFitnes.miercoles, resulatdoFitnes.jueves],
              });
              break;
            }
          }
          if (resulatdoFitnes.resultado === true) {
            break;
          }
          cromosomas = CM(cromosomas, req.body.dias);
        }
        res.status(200).json(
            resulatdoFitnes);
      } else if (req.body.dias === 5) {
        const receta_col1 = recetas.slice(0, 14);
        const receta_col2 = recetas.slice(14, 28);
        const receta_col3 = recetas.slice(28, 42);
        const receta_col4 = recetas.slice(42, 56);
        const receta_col5 = recetas.slice(56, 70);
        for (let i = 0; i < 70; i++) {
          cromosomas.push([Math.floor(Math.random() * 14), Math.floor(Math.random() * 14), Math.floor(Math.random() * 14), Math.floor(Math.random() * 14), Math.floor(Math.random() * 14)]);
        }
        while (temp) {
          for (const temp of cromosomas) {
            resulatdoFitnes = funcionFitnes5Dia(temp, receta_col1, receta_col2, receta_col3, receta_col4, receta_col5, req.body.caloriaObjetivo, req.body.proteinaObjetivo, req.body.dias);
            if (resulatdoFitnes.resultado === true) {
              console.log("-------------------entre--------------");
              db.collection("Menus").add({
                idUser: req.body.idUser,
                FechaCreacion: (new Date()),
                Recetas: [resulatdoFitnes.lunes, resulatdoFitnes.martes, resulatdoFitnes.miercoles, resulatdoFitnes.jueves, resulatdoFitnes.viernes],
              });
              break;
            }
          }
          if (resulatdoFitnes.resultado === true) {
            break;
          }
          cromosomas = CM(cromosomas, req.body.dias);
        }
        res.status(200).json(
            resulatdoFitnes);
      } else if (req.body.dias === 6) {
        const receta_col1 = recetas.slice(0, 11);
        const receta_col2 = recetas.slice(11, 22);
        const receta_col3 = recetas.slice(22, 33);
        const receta_col4 = recetas.slice(33, 44);
        const receta_col5 = recetas.slice(44, 55);
        const receta_col6 = recetas.slice(55, 66);
        for (let i = 0; i < 70; i++) {
          cromosomas.push([Math.floor(Math.random() * 11), Math.floor(Math.random() * 11), Math.floor(Math.random() * 11), Math.floor(Math.random() * 11), Math.floor(Math.random() * 11), Math.floor(Math.random() * 11)]);
        }
        while (temp) {
          for (const temp of cromosomas) {
            resulatdoFitnes = funcionFitnes6Dia(temp, receta_col1, receta_col2, receta_col3, receta_col4, receta_col5, receta_col6, req.body.caloriaObjetivo, req.body.proteinaObjetivo, req.body.dias);
            if (resulatdoFitnes.resultado === true) {
              console.log("-------------------entre--------------");
              db.collection("Menus").add({
                idUser: req.body.idUser,
                FechaCreacion: (new Date()),
                Recetas: [resulatdoFitnes.lunes, resulatdoFitnes.martes, resulatdoFitnes.miercoles, resulatdoFitnes.jueves, resulatdoFitnes.viernes, resulatdoFitnes.sabado],
              });
              break;
            }
          }
          if (resulatdoFitnes.resultado === true) {
            break;
          }
          cromosomas = CM(cromosomas, req.body.dias);
        }
        res.status(200).json(
            resulatdoFitnes);
      } else if (req.body.dias === 7) {
        const receta_col1 = recetas.slice(0, 10);
        const receta_col2 = recetas.slice(10, 20);
        const receta_col3 = recetas.slice(20, 30);
        const receta_col4 = recetas.slice(30, 40);
        const receta_col5 = recetas.slice(40, 50);
        const receta_col6 = recetas.slice(50, 60);
        const receta_col7 = recetas.slice(60, 70);
        for (let i = 0; i < 70; i++) {
          cromosomas.push([Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]);
        }
        while (temp) {
          for (const temp of cromosomas) {
            resulatdoFitnes = funcionFitnes7Dia(temp, receta_col1, receta_col2, receta_col3, receta_col4, receta_col5, receta_col6, receta_col7, req.body.caloriaObjetivo, req.body.proteinaObjetivo, req.body.dias);
            if (resulatdoFitnes.resultado === true) {
              console.log("-------------------entre--------------");
              db.collection("Menus").add({
                idUser: req.body.idUser,
                FechaCreacion: (new Date()),
                Recetas: [resulatdoFitnes.lunes, resulatdoFitnes.martes, resulatdoFitnes.miercoles, resulatdoFitnes.jueves, resulatdoFitnes.viernes, resulatdoFitnes.sabado],
              });
              break;
            }
          }
          if (resulatdoFitnes.resultado === true) {
            break;
          }
          cromosomas = CM(cromosomas, req.body.dias);
        }
        res.status(200).json(
            resulatdoFitnes);
      } else {
        return res.status(400).json(
            {
              message: "La cantidad de dias selecionada no esta dentro del rango establecido de 1 a 7 dias ",
            },
        );
      }
    } else {
      return res.status(400).json(
          {
            message: "No se envio todos los parametros en el body del request",
          },
      );
    }
  } else {
    return res.status(400).json(
        {
          message: "No se envio todos los parametros en el body del request",
        },
    );
  }
});

app.post("/AG", async (req, res) => {
  console.log("-----------------------Empezo la funcion -----------------------");
  console.log("reques body recibido: ", req.body);
  if (req.body.idUser && req.body.dias && req.body.caloriaObjetivo && req.body.proteinaObjetivo) {
    let alimentos = null;
    const tempAlimentos = [];
    const cromosomas_desyuno = [];
    const cromosomas_comida = [];
    const cromosomas_snak = [];
    const constWhile = true;
    let resulatdoFitnesDesayuno = null;
    let resulatdoFitnesAlmuerzo = null;
    let resulatdoFitnesSnack = null;
    await db.collection("Alimentos").get().then((res) => {
      res.forEach((data) => {
        tempAlimentos.push(data.data());
      });
    });
    alimentos = tempAlimentos.filter((alimento) => alimento.Nombre !== req.body.alimentoNoDeseado);
    const liquidos = alimentos.filter((alimento) => alimento.Líquido === true);
    const carnes = alimentos.filter((alimento) => alimento.Tipo === "carne");
    const desayuno = alimentos.filter((alimento) => alimento.Desayuno === true);
    const snack = alimentos.filter((alimento) => alimento.Tipo === "fruta");
    const almuerzo = alimentos.filter((alimento) => alimento.Almuerzo === true);
    if (req.body.dias === 1) {
      for (let i = 0; i < 400; i++) {
        cromosomas_desyuno.push([Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)]);
        cromosomas_comida.push([Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)]);
        cromosomas_snak.push([Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)]);
      }
      while (constWhile) {
        for (const temp of cromosomas_desyuno) {
          resulatdoFitnesDesayuno = funcionFitnesDesayuno(temp, liquidos, desayuno, (req.body.caloriaObjetivo*0.15), (req.body.proteinaObjetivo*0.15), req.body.dias);
          if (resulatdoFitnesDesayuno.resultado) {
            break;
          }
        }
        if (resulatdoFitnesDesayuno.resultado) {
          break;
        }
      }
      while (constWhile) {
        for (const temp of cromosomas_comida) {
          resulatdoFitnesAlmuerzo = funcionFitnesAlmuerzo(temp, carnes, almuerzo, (req.body.caloriaObjetivo*0.35), (req.body.proteinaObjetivo*0.35), req.body.dias);
          if (resulatdoFitnesAlmuerzo.resultado) {
            break;
          }
        }
        if (resulatdoFitnesAlmuerzo.resultado) {
          break;
        }
      }
      while (constWhile) {
        for (const temp of cromosomas_snak) {
          resulatdoFitnesSnack = funcionFitnesSnack(temp, snack, (req.body.caloriaObjetivo*0.15), (req.body.proteinaObjetivo*0.15), req.body.dias);
          if (resulatdoFitnesSnack.resultado) {
            console.log(resulatdoFitnesSnack);
            break;
          }
        }
        if (resulatdoFitnesSnack.resultado) {
          break;
        }
      }
      await db.collection("Menus").add({
        idUser: req.body.idUser,
        FechaCreacion: (new Date()),
        dias: req.body.dias,
        caloriaObjetivo: req.body.caloriaObjetivo,
        proteinaObjetivo: req.body.proteinaObjetivo,
        Recetas: {
          desayuno: resulatdoFitnesDesayuno.desayuno,
          almuerzo: resulatdoFitnesAlmuerzo.almuerzo,
          snack: resulatdoFitnesSnack.snack,
          cena: resulatdoFitnesAlmuerzo.almuerzo,
        },
      });
      return res.status(200).json(
          {
            message: "OK",
            desayuno: resulatdoFitnesDesayuno.desayuno,
            almuerzo: resulatdoFitnesAlmuerzo.almuerzo,
            snack: resulatdoFitnesSnack.snack,
            cena: resulatdoFitnesAlmuerzo.almuerzo,
          },
      );
    } else if (req.body.dias === 2) {
      for (let i = 0; i < 400; i++) {
        cromosomas_desyuno.push([[Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)], [Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)]]);
        cromosomas_comida.push([[Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)], [Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)]]);
        cromosomas_snak.push([[Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)], [Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)]]);
      }
      while (constWhile) {
        for (const temp of cromosomas_desyuno) {
          resulatdoFitnesDesayuno = funcionFitnesDesayuno(temp, liquidos, desayuno, (req.body.caloriaObjetivo*0.15)*2, (req.body.proteinaObjetivo*0.15)*2, req.body.dias);
          if (resulatdoFitnesDesayuno.resultado) {
            console.log(resulatdoFitnesDesayuno);
            break;
          }
        }
        if (resulatdoFitnesDesayuno.resultado) {
          break;
        }
        funcionCruzeMutacion(cromosomas_desyuno);
      }
      while (constWhile) {
        for (const temp of cromosomas_comida) {
          resulatdoFitnesAlmuerzo = funcionFitnesAlmuerzo(temp, carnes, almuerzo, (req.body.caloriaObjetivo*0.35)*2, (req.body.proteinaObjetivo*0.35)*2, req.body.dias);
          if (resulatdoFitnesAlmuerzo.resultado) {
            break;
          }
        }
        if (resulatdoFitnesAlmuerzo.resultado) {
          break;
        }
        funcionCruzeMutacion(cromosomas_comida);
      }
      while (constWhile) {
        for (const temp of cromosomas_snak) {
          resulatdoFitnesSnack = funcionFitnesSnack(temp, snack, (req.body.caloriaObjetivo*0.15)*2, (req.body.proteinaObjetivo*0.15)*2, req.body.dias);
          if (resulatdoFitnesSnack.resultado) {
            console.log(resulatdoFitnesSnack);
            break;
          }
        }
        if (resulatdoFitnesSnack.resultado) {
          break;
        }
        funcionCruzeMutacion(cromosomas_snak);
      }
      await db.collection("Menus").add({
        idUser: req.body.idUser,
        FechaCreacion: (new Date()),
        dias: req.body.dias,
        caloriaObjetivo: req.body.caloriaObjetivo,
        proteinaObjetivo: req.body.proteinaObjetivo,
        Recetas: {
          desayuno: resulatdoFitnesDesayuno.desayuno,
          desayuno2: resulatdoFitnesDesayuno.desayuno2,
          almuerzo: resulatdoFitnesAlmuerzo.almuerzo,
          almuerzo2: resulatdoFitnesAlmuerzo.almuerzo2,
          snack: resulatdoFitnesSnack.snack,
          snack2: resulatdoFitnesSnack.snack2,
          cena: resulatdoFitnesAlmuerzo.almuerzo,
          cena2: resulatdoFitnesAlmuerzo.almuerzo2,
        },
      });
      return res.status(200).json(
          {
            message: "OK",
            desayuno: resulatdoFitnesDesayuno.desayuno,
            desayuno2: resulatdoFitnesDesayuno.desayuno2,
            almuerzo: resulatdoFitnesAlmuerzo.almuerzo,
            almuerzo2: resulatdoFitnesAlmuerzo.almuerzo2,
            snack: resulatdoFitnesSnack.snack,
            snack2: resulatdoFitnesSnack.snack2,
            cena: resulatdoFitnesAlmuerzo.almuerzo,
            cena2: resulatdoFitnesAlmuerzo.almuerzo2,
          },
      );
    } else if (req.body.dias === 3) {
      for (let i = 0; i < 400; i++) {
        cromosomas_desyuno.push([[Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)], [Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)], [Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)]]);
        cromosomas_comida.push([[Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)], [Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)], [Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)]]);
        cromosomas_snak.push([[Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)], [Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)], [Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)]]);
      }
      while (constWhile) {
        for (const temp of cromosomas_desyuno) {
          resulatdoFitnesDesayuno = funcionFitnesDesayuno(temp, liquidos, desayuno, (req.body.caloriaObjetivo*0.15)*3, (req.body.proteinaObjetivo*0.15)*3, req.body.dias);
          if (resulatdoFitnesDesayuno.resultado) {
            console.log(resulatdoFitnesDesayuno);
            break;
          }
        }
        if (resulatdoFitnesDesayuno.resultado) {
          break;
        }
        funcionCruzeMutacion(cromosomas_desyuno);
      }
      while (constWhile) {
        for (const temp of cromosomas_comida) {
          resulatdoFitnesAlmuerzo = funcionFitnesAlmuerzo(temp, carnes, almuerzo, (req.body.caloriaObjetivo*0.35)*3, (req.body.proteinaObjetivo*0.35)*3, req.body.dias);
          if (resulatdoFitnesAlmuerzo.resultado) {
            break;
          }
        }
        if (resulatdoFitnesAlmuerzo.resultado) {
          break;
        }
        funcionCruzeMutacion(cromosomas_comida);
      }
      while (constWhile) {
        for (const temp of cromosomas_snak) {
          resulatdoFitnesSnack = funcionFitnesSnack(temp, snack, (req.body.caloriaObjetivo*0.15)*3, (req.body.proteinaObjetivo*0.15)*3, req.body.dias);
          if (resulatdoFitnesSnack.resultado) {
            console.log(resulatdoFitnesSnack);
            break;
          }
        }
        if (resulatdoFitnesSnack.resultado) {
          break;
        }
        funcionCruzeMutacion(cromosomas_snak);
      }
      await db.collection("Menus").add({
        idUser: req.body.idUser,
        FechaCreacion: (new Date()),
        dias: req.body.dias,
        caloriaObjetivo: req.body.caloriaObjetivo,
        proteinaObjetivo: req.body.proteinaObjetivo,
        Recetas: {
          desayuno: resulatdoFitnesDesayuno.desayuno,
          desayuno2: resulatdoFitnesDesayuno.desayuno2,
          desayuno3: resulatdoFitnesDesayuno.desayuno3,
          almuerzo: resulatdoFitnesAlmuerzo.almuerzo,
          almuerzo2: resulatdoFitnesAlmuerzo.almuerzo2,
          almuerzo3: resulatdoFitnesAlmuerzo.almuerzo3,
          snack: resulatdoFitnesSnack.snack,
          snack2: resulatdoFitnesSnack.snack2,
          snack3: resulatdoFitnesSnack.snack3,
          cena: resulatdoFitnesAlmuerzo.almuerzo,
          cena2: resulatdoFitnesAlmuerzo.almuerzo2,
          cena3: resulatdoFitnesAlmuerzo.almuerzo3,
        },
      });
      return res.status(200).json(
          {
            message: "OK",
            desayuno: resulatdoFitnesDesayuno.desayuno,
            desayuno2: resulatdoFitnesDesayuno.desayuno2,
            desayuno3: resulatdoFitnesDesayuno.desayuno3,
            almuerzo: resulatdoFitnesAlmuerzo.almuerzo,
            almuerzo2: resulatdoFitnesAlmuerzo.almuerzo2,
            almuerzo3: resulatdoFitnesAlmuerzo.almuerzo3,
            snack: resulatdoFitnesSnack.snack,
            snack2: resulatdoFitnesSnack.snack2,
            snack3: resulatdoFitnesSnack.snack3,
            cena: resulatdoFitnesAlmuerzo.almuerzo,
            cena2: resulatdoFitnesAlmuerzo.almuerzo2,
            cena3: resulatdoFitnesAlmuerzo.almuerzo3,
          },
      );
    } else if (req.body.dias === 4) {
      for (let i = 0; i < 400; i++) {
        cromosomas_desyuno.push([[Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)], [Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)], [Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)], [Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)]]);
        cromosomas_comida.push([[Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)], [Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)], [Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)], [Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)]]);
        cromosomas_snak.push([[Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)], [Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)], [Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)], [Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)]]);
      }
      while (constWhile) {
        for (const temp of cromosomas_desyuno) {
          resulatdoFitnesDesayuno = funcionFitnesDesayuno(temp, liquidos, desayuno, (req.body.caloriaObjetivo*0.15)*4, (req.body.proteinaObjetivo*0.15)*4, req.body.dias);
          if (resulatdoFitnesDesayuno.resultado) {
            console.log(resulatdoFitnesDesayuno);
            break;
          }
        }
        if (resulatdoFitnesDesayuno.resultado) {
          break;
        }
        funcionCruzeMutacion(cromosomas_desyuno);
      }
      while (constWhile) {
        for (const temp of cromosomas_comida) {
          resulatdoFitnesAlmuerzo = funcionFitnesAlmuerzo(temp, carnes, almuerzo, (req.body.caloriaObjetivo*0.35)*4, (req.body.proteinaObjetivo*0.35)*4, req.body.dias);
          if (resulatdoFitnesAlmuerzo.resultado) {
            break;
          }
        }
        if (resulatdoFitnesAlmuerzo.resultado) {
          break;
        }
        funcionCruzeMutacion(cromosomas_comida);
      }
      while (constWhile) {
        for (const temp of cromosomas_snak) {
          resulatdoFitnesSnack = funcionFitnesSnack(temp, snack, (req.body.caloriaObjetivo*0.15)*4, (req.body.proteinaObjetivo*0.15)*4, req.body.dias);
          if (resulatdoFitnesSnack.resultado) {
            console.log(resulatdoFitnesSnack);
            break;
          }
        }
        if (resulatdoFitnesSnack.resultado) {
          break;
        }
        funcionCruzeMutacion(cromosomas_snak);
      }
      await db.collection("Menus").add({
        idUser: req.body.idUser,
        FechaCreacion: (new Date()),
        dias: req.body.dias,
        caloriaObjetivo: req.body.caloriaObjetivo,
        proteinaObjetivo: req.body.proteinaObjetivo,
        Recetas: {
          desayuno: resulatdoFitnesDesayuno.desayuno,
          desayuno2: resulatdoFitnesDesayuno.desayuno2,
          desayuno3: resulatdoFitnesDesayuno.desayuno3,
          desayuno4: resulatdoFitnesDesayuno.desayuno4,
          almuerzo: resulatdoFitnesAlmuerzo.almuerzo,
          almuerzo2: resulatdoFitnesAlmuerzo.almuerzo2,
          almuerzo3: resulatdoFitnesAlmuerzo.almuerzo3,
          almuerzo4: resulatdoFitnesAlmuerzo.almuerzo4,
          snack: resulatdoFitnesSnack.snack,
          snack2: resulatdoFitnesSnack.snack2,
          snack3: resulatdoFitnesSnack.snack3,
          snack4: resulatdoFitnesSnack.snack4,
          cena: resulatdoFitnesAlmuerzo.almuerzo,
          cena2: resulatdoFitnesAlmuerzo.almuerzo2,
          cena3: resulatdoFitnesAlmuerzo.almuerzo3,
          cena4: resulatdoFitnesAlmuerzo.almuerzo4,
        },
      });
      return res.status(200).json(
          {
            message: "OK",
            desayuno: resulatdoFitnesDesayuno.desayuno,
            desayuno2: resulatdoFitnesDesayuno.desayuno2,
            desayuno3: resulatdoFitnesDesayuno.desayuno3,
            desayuno4: resulatdoFitnesDesayuno.desayuno4,
            almuerzo: resulatdoFitnesAlmuerzo.almuerzo,
            almuerzo2: resulatdoFitnesAlmuerzo.almuerzo2,
            almuerzo3: resulatdoFitnesAlmuerzo.almuerzo3,
            almuerzo4: resulatdoFitnesAlmuerzo.almuerzo4,
            snack: resulatdoFitnesSnack.snack,
            snack2: resulatdoFitnesSnack.snack2,
            snack3: resulatdoFitnesSnack.snack3,
            snack4: resulatdoFitnesSnack.snack4,
            cena: resulatdoFitnesAlmuerzo.almuerzo,
            cena2: resulatdoFitnesAlmuerzo.almuerzo2,
            cena3: resulatdoFitnesAlmuerzo.almuerzo3,
            cena4: resulatdoFitnesAlmuerzo.almuerzo4,
          },
      );
    } else if (req.body.dias === 5) {
      for (let i = 0; i < 400; i++) {
        cromosomas_desyuno.push([[Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)], [Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)], [Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)], [Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)], [Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)]]);
        cromosomas_comida.push([[Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)], [Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)], [Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)], [Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)], [Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)]]);
        cromosomas_snak.push([[Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)], [Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)], [Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)], [Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)], [Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)], [Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)]]);
      }
      while (constWhile) {
        for (const temp of cromosomas_desyuno) {
          resulatdoFitnesDesayuno = funcionFitnesDesayuno(temp, liquidos, desayuno, (req.body.caloriaObjetivo*0.15)*5, (req.body.proteinaObjetivo*0.15)*5, req.body.dias);
          if (resulatdoFitnesDesayuno.resultado) {
            console.log(resulatdoFitnesDesayuno);
            break;
          }
        }
        if (resulatdoFitnesDesayuno.resultado) {
          break;
        }
        funcionCruzeMutacion(cromosomas_desyuno);
      }
      while (constWhile) {
        for (const temp of cromosomas_comida) {
          resulatdoFitnesAlmuerzo = funcionFitnesAlmuerzo(temp, carnes, almuerzo, (req.body.caloriaObjetivo*0.35)*5, (req.body.proteinaObjetivo*0.35)*5, req.body.dias);
          if (resulatdoFitnesAlmuerzo.resultado) {
            break;
          }
        }
        if (resulatdoFitnesAlmuerzo.resultado) {
          break;
        }
        funcionCruzeMutacion(cromosomas_comida);
      }
      while (constWhile) {
        for (const temp of cromosomas_snak) {
          resulatdoFitnesSnack = funcionFitnesSnack(temp, snack, (req.body.caloriaObjetivo*0.15)*5, (req.body.proteinaObjetivo*0.15)*5, req.body.dias);
          if (resulatdoFitnesSnack.resultado) {
            console.log(resulatdoFitnesSnack);
            break;
          }
        }
        if (resulatdoFitnesSnack.resultado) {
          break;
        }
        funcionCruzeMutacion(cromosomas_snak);
      }
      await db.collection("Menus").add({
        idUser: req.body.idUser,
        FechaCreacion: (new Date()),
        dias: req.body.dias,
        caloriaObjetivo: req.body.caloriaObjetivo,
        proteinaObjetivo: req.body.proteinaObjetivo,
        Recetas: {
          desayuno: resulatdoFitnesDesayuno.desayuno,
          desayuno2: resulatdoFitnesDesayuno.desayuno2,
          desayuno3: resulatdoFitnesDesayuno.desayuno3,
          desayuno4: resulatdoFitnesDesayuno.desayuno4,
          desayuno5: resulatdoFitnesDesayuno.desayuno5,
          almuerzo: resulatdoFitnesAlmuerzo.almuerzo,
          almuerzo2: resulatdoFitnesAlmuerzo.almuerzo2,
          almuerzo3: resulatdoFitnesAlmuerzo.almuerzo3,
          almuerzo4: resulatdoFitnesAlmuerzo.almuerzo4,
          almuerzo5: resulatdoFitnesAlmuerzo.almuerzo5,
          snack: resulatdoFitnesSnack.snack,
          snack2: resulatdoFitnesSnack.snack2,
          snack3: resulatdoFitnesSnack.snack3,
          snack4: resulatdoFitnesSnack.snack4,
          snack5: resulatdoFitnesSnack.snack5,
          cena: resulatdoFitnesAlmuerzo.almuerzo,
          cena2: resulatdoFitnesAlmuerzo.almuerzo2,
          cena3: resulatdoFitnesAlmuerzo.almuerzo3,
          cena4: resulatdoFitnesAlmuerzo.almuerzo4,
          cena5: resulatdoFitnesAlmuerzo.almuerzo5,
        },
      });
      return res.status(200).json(
          {
            message: "OK",
            desayuno: resulatdoFitnesDesayuno.desayuno,
            desayuno2: resulatdoFitnesDesayuno.desayuno2,
            desayuno3: resulatdoFitnesDesayuno.desayuno3,
            desayuno4: resulatdoFitnesDesayuno.desayuno4,
            desayuno5: resulatdoFitnesDesayuno.desayuno5,
            almuerzo: resulatdoFitnesAlmuerzo.almuerzo,
            almuerzo2: resulatdoFitnesAlmuerzo.almuerzo2,
            almuerzo3: resulatdoFitnesAlmuerzo.almuerzo3,
            almuerzo4: resulatdoFitnesAlmuerzo.almuerzo4,
            almuerzo5: resulatdoFitnesAlmuerzo.almuerzo5,
            snack: resulatdoFitnesSnack.snack,
            snack2: resulatdoFitnesSnack.snack2,
            snack3: resulatdoFitnesSnack.snack3,
            snack4: resulatdoFitnesSnack.snack4,
            snack5: resulatdoFitnesSnack.snack5,
            cena: resulatdoFitnesAlmuerzo.almuerzo,
            cena2: resulatdoFitnesAlmuerzo.almuerzo2,
            cena3: resulatdoFitnesAlmuerzo.almuerzo3,
            cena4: resulatdoFitnesAlmuerzo.almuerzo4,
            cena5: resulatdoFitnesAlmuerzo.almuerzo5,
          },
      );
    } else if (req.body.dias === 6) {
      for (let i = 0; i < 400; i++) {
        cromosomas_desyuno.push([[Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)], [Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)], [Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)], [Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)], [Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)], [Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)]]);
        cromosomas_comida.push([[Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)], [Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)], [Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)], [Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)], [Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)], [Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)]]);
        cromosomas_snak.push([[Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)], [Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)], [Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)], [Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)], [Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)], [Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)], [Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)]]);
      }
      while (constWhile) {
        for (const temp of cromosomas_desyuno) {
          resulatdoFitnesDesayuno = funcionFitnesDesayuno(temp, liquidos, desayuno, (req.body.caloriaObjetivo*0.15)*6, (req.body.proteinaObjetivo*0.15)*6, req.body.dias);
          if (resulatdoFitnesDesayuno.resultado) {
            console.log(resulatdoFitnesDesayuno);
            break;
          }
        }
        if (resulatdoFitnesDesayuno.resultado) {
          break;
        }
        funcionCruzeMutacion(cromosomas_desyuno);
      }
      while (constWhile) {
        for (const temp of cromosomas_comida) {
          resulatdoFitnesAlmuerzo = funcionFitnesAlmuerzo(temp, carnes, almuerzo, (req.body.caloriaObjetivo*0.35)*6, (req.body.proteinaObjetivo*0.35)*6, req.body.dias);
          if (resulatdoFitnesAlmuerzo.resultado) {
            break;
          }
        }
        if (resulatdoFitnesAlmuerzo.resultado) {
          break;
        }
        funcionCruzeMutacion(cromosomas_comida);
      }
      while (constWhile) {
        for (const temp of cromosomas_snak) {
          resulatdoFitnesSnack = funcionFitnesSnack(temp, snack, (req.body.caloriaObjetivo*0.15)*6, (req.body.proteinaObjetivo*0.15)*6, req.body.dias);
          if (resulatdoFitnesSnack.resultado) {
            console.log(resulatdoFitnesSnack);
            break;
          }
        }
        if (resulatdoFitnesSnack.resultado) {
          break;
        }
        funcionCruzeMutacion(cromosomas_snak);
      }
      await db.collection("Menus").add({
        idUser: req.body.idUser,
        FechaCreacion: (new Date()),
        dias: req.body.dias,
        caloriaObjetivo: req.body.caloriaObjetivo,
        proteinaObjetivo: req.body.proteinaObjetivo,
        Recetas: {
          desayuno: resulatdoFitnesDesayuno.desayuno,
          desayuno2: resulatdoFitnesDesayuno.desayuno2,
          desayuno3: resulatdoFitnesDesayuno.desayuno3,
          desayuno4: resulatdoFitnesDesayuno.desayuno4,
          desayuno5: resulatdoFitnesDesayuno.desayuno5,
          desayuno6: resulatdoFitnesDesayuno.desayuno6,
          almuerzo: resulatdoFitnesAlmuerzo.almuerzo,
          almuerzo2: resulatdoFitnesAlmuerzo.almuerzo2,
          almuerzo3: resulatdoFitnesAlmuerzo.almuerzo3,
          almuerzo4: resulatdoFitnesAlmuerzo.almuerzo4,
          almuerzo5: resulatdoFitnesAlmuerzo.almuerzo5,
          almuerzo6: resulatdoFitnesAlmuerzo.almuerzo6,
          snack: resulatdoFitnesSnack.snack,
          snack2: resulatdoFitnesSnack.snack2,
          snack3: resulatdoFitnesSnack.snack3,
          snack4: resulatdoFitnesSnack.snack4,
          snack5: resulatdoFitnesSnack.snack5,
          snack6: resulatdoFitnesSnack.snack6,
          cena: resulatdoFitnesAlmuerzo.almuerzo,
          cena2: resulatdoFitnesAlmuerzo.almuerzo2,
          cena3: resulatdoFitnesAlmuerzo.almuerzo3,
          cena4: resulatdoFitnesAlmuerzo.almuerzo4,
          cena5: resulatdoFitnesAlmuerzo.almuerzo5,
          cena6: resulatdoFitnesAlmuerzo.almuerzo6,
        },
      });
      return res.status(200).json(
          {
            message: "OK",
            desayuno: resulatdoFitnesDesayuno.desayuno,
            desayuno2: resulatdoFitnesDesayuno.desayuno2,
            desayuno3: resulatdoFitnesDesayuno.desayuno3,
            desayuno4: resulatdoFitnesDesayuno.desayuno4,
            desayuno5: resulatdoFitnesDesayuno.desayuno5,
            desayuno6: resulatdoFitnesDesayuno.desayuno6,
            almuerzo: resulatdoFitnesAlmuerzo.almuerzo,
            almuerzo2: resulatdoFitnesAlmuerzo.almuerzo2,
            almuerzo3: resulatdoFitnesAlmuerzo.almuerzo3,
            almuerzo4: resulatdoFitnesAlmuerzo.almuerzo4,
            almuerzo5: resulatdoFitnesAlmuerzo.almuerzo5,
            almuerzo6: resulatdoFitnesAlmuerzo.almuerzo6,
            snack: resulatdoFitnesSnack.snack,
            snack2: resulatdoFitnesSnack.snack2,
            snack3: resulatdoFitnesSnack.snack3,
            snack4: resulatdoFitnesSnack.snack4,
            snack5: resulatdoFitnesSnack.snack5,
            snack6: resulatdoFitnesSnack.snack6,
            cena: resulatdoFitnesAlmuerzo.almuerzo,
            cena2: resulatdoFitnesAlmuerzo.almuerzo2,
            cena3: resulatdoFitnesAlmuerzo.almuerzo3,
            cena4: resulatdoFitnesAlmuerzo.almuerzo4,
            cena5: resulatdoFitnesAlmuerzo.almuerzo5,
            cena6: resulatdoFitnesAlmuerzo.almuerzo6,
          },
      );
    } else if (req.body.dias === 7) {
      for (let i = 0; i < 400; i++) {
        cromosomas_desyuno.push([[Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)], [Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)], [Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)], [Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)], [Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)], [Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)], [Math.floor(Math.random() * liquidos.length), Math.floor(Math.random() * desayuno.length)]]);
        cromosomas_comida.push([[Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)], [Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)], [Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)], [Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)], [Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)], [Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)], [Math.floor(Math.random() * carnes.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length), Math.floor(Math.random() * almuerzo.length)]]);
        cromosomas_snak.push([[Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)], [Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)], [Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)], [Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)], [Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)], [Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)], [Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)], [Math.floor(Math.random() * snack.length), Math.floor(Math.random() * snack.length)]]);
      }
      while (constWhile) {
        for (const temp of cromosomas_desyuno) {
          resulatdoFitnesDesayuno = funcionFitnesDesayuno(temp, liquidos, desayuno, (req.body.caloriaObjetivo*0.15)*7, (req.body.proteinaObjetivo*0.15)*7, req.body.dias);
          if (resulatdoFitnesDesayuno.resultado) {
            console.log(resulatdoFitnesDesayuno);
            break;
          }
        }
        if (resulatdoFitnesDesayuno.resultado) {
          break;
        }
        funcionCruzeMutacion(cromosomas_desyuno);
      }
      while (constWhile) {
        for (const temp of cromosomas_comida) {
          resulatdoFitnesAlmuerzo = funcionFitnesAlmuerzo(temp, carnes, almuerzo, (req.body.caloriaObjetivo*0.35)*7, (req.body.proteinaObjetivo*0.35)*7, req.body.dias);
          if (resulatdoFitnesAlmuerzo.resultado) {
            break;
          }
        }
        if (resulatdoFitnesAlmuerzo.resultado) {
          break;
        }
        funcionCruzeMutacion(cromosomas_comida);
      }
      while (constWhile) {
        for (const temp of cromosomas_snak) {
          resulatdoFitnesSnack = funcionFitnesSnack(temp, snack, (req.body.caloriaObjetivo*0.15)*7, (req.body.proteinaObjetivo*0.15)*7, req.body.dias);
          if (resulatdoFitnesSnack.resultado) {
            console.log(resulatdoFitnesSnack);
            break;
          }
        }
        if (resulatdoFitnesSnack.resultado) {
          break;
        }
        funcionCruzeMutacion(cromosomas_snak);
      }
      await db.collection("Menus").add({
        idUser: req.body.idUser,
        FechaCreacion: (new Date()),
        dias: req.body.dias,
        caloriaObjetivo: req.body.caloriaObjetivo,
        proteinaObjetivo: req.body.proteinaObjetivo,
        Recetas: {
          desayuno: resulatdoFitnesDesayuno.desayuno,
          desayuno2: resulatdoFitnesDesayuno.desayuno2,
          desayuno3: resulatdoFitnesDesayuno.desayuno3,
          desayuno4: resulatdoFitnesDesayuno.desayuno4,
          desayuno5: resulatdoFitnesDesayuno.desayuno5,
          desayuno6: resulatdoFitnesDesayuno.desayuno6,
          desayuno7: resulatdoFitnesDesayuno.desayuno7,
          almuerzo: resulatdoFitnesAlmuerzo.almuerzo,
          almuerzo2: resulatdoFitnesAlmuerzo.almuerzo2,
          almuerzo3: resulatdoFitnesAlmuerzo.almuerzo3,
          almuerzo4: resulatdoFitnesAlmuerzo.almuerzo4,
          almuerzo5: resulatdoFitnesAlmuerzo.almuerzo5,
          almuerzo6: resulatdoFitnesAlmuerzo.almuerzo6,
          almuerzo7: resulatdoFitnesAlmuerzo.almuerzo7,
          snack: resulatdoFitnesSnack.snack,
          snack2: resulatdoFitnesSnack.snack2,
          snack3: resulatdoFitnesSnack.snack3,
          snack4: resulatdoFitnesSnack.snack4,
          snack5: resulatdoFitnesSnack.snack5,
          snack6: resulatdoFitnesSnack.snack6,
          snack7: resulatdoFitnesSnack.snack7,
          cena: resulatdoFitnesAlmuerzo.almuerzo,
          cena2: resulatdoFitnesAlmuerzo.almuerzo2,
          cena3: resulatdoFitnesAlmuerzo.almuerzo3,
          cena4: resulatdoFitnesAlmuerzo.almuerzo4,
          cena5: resulatdoFitnesAlmuerzo.almuerzo5,
          cena6: resulatdoFitnesAlmuerzo.almuerzo6,
          cena7: resulatdoFitnesAlmuerzo.almuerzo7,
        },
      });
      return res.status(200).json(
          {
            message: "OK",
            desayuno: resulatdoFitnesDesayuno.desayuno,
            desayuno2: resulatdoFitnesDesayuno.desayuno2,
            desayuno3: resulatdoFitnesDesayuno.desayuno3,
            desayuno4: resulatdoFitnesDesayuno.desayuno4,
            desayuno5: resulatdoFitnesDesayuno.desayuno5,
            desayuno6: resulatdoFitnesDesayuno.desayuno6,
            desayuno7: resulatdoFitnesDesayuno.desayuno7,
            almuerzo: resulatdoFitnesAlmuerzo.almuerzo,
            almuerzo2: resulatdoFitnesAlmuerzo.almuerzo2,
            almuerzo3: resulatdoFitnesAlmuerzo.almuerzo3,
            almuerzo4: resulatdoFitnesAlmuerzo.almuerzo4,
            almuerzo5: resulatdoFitnesAlmuerzo.almuerzo5,
            almuerzo6: resulatdoFitnesAlmuerzo.almuerzo6,
            almuerzo7: resulatdoFitnesAlmuerzo.almuerzo7,
            snack: resulatdoFitnesSnack.snack,
            snack2: resulatdoFitnesSnack.snack2,
            snack3: resulatdoFitnesSnack.snack3,
            snack4: resulatdoFitnesSnack.snack4,
            snack5: resulatdoFitnesSnack.snack5,
            snack6: resulatdoFitnesSnack.snack6,
            snack7: resulatdoFitnesSnack.snack7,
            cena: resulatdoFitnesAlmuerzo.almuerzo,
            cena2: resulatdoFitnesAlmuerzo.almuerzo2,
            cena3: resulatdoFitnesAlmuerzo.almuerzo3,
            cena4: resulatdoFitnesAlmuerzo.almuerzo4,
            cena5: resulatdoFitnesAlmuerzo.almuerzo5,
            cena6: resulatdoFitnesAlmuerzo.almuerzo6,
            cena7: resulatdoFitnesAlmuerzo.almuerzo7,
          },
      );
    }
  } else {
    return res.status(400).json(
        {
          message: "No se envio todos los parametros en el body del request",
        },
    );
  }
});


app.post("/Carga", async (req, res) => {
  console.log("reques body recibido: ", req.body);
  Object.keys(dataCarga).forEach((docKey) => {
    db.collection("Alimentos").add(dataCarga[docKey]);
  });
  return res.status(200).json(
      {
        message: "OK",
      },
  );
});

exports.app = functions.https.onRequest(app);
