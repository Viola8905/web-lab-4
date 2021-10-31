/*
В3. Інформація у записі про товар включає в себе: ID, назва товару; кількість товару в одиницях; ціна за одиницю товару; 
одиниці вимірювання (штуки, кілограми, літри), термін зберігання (в днях).


1. Описати клас для збереження даних про об'єкт згідно із варіантом.
2. Утворити список із 3-5 об'єктів.
3. Описати клас для виводу таблиці на основі списку.
4. Доповнити клас методом додавання нового запису.
5. Доповнити клас методом вилучення запису, що відповідає певній умові.
6. На сторінці розмістити форму для додавання даних про новий об'єкт.
7. Доповнити кожен рядок таблиці кнопкою для вилучення даних про об'єкт.
8. Доповнити сторінку формою та кнопками для редагування даних про об'єкт.
9. Додати метод для підсвічування (зміни кольору фону рядків), записи яких відповідають певній умові.
10. Здійснити валідацію даних (ПІБ не може бути порожнім рядком, заробітна плата повинна бути невід'ємним числом, тощо)



*/

let list = [
  {
    id: "7",
    productName: "Помідори",
    countOfproducts: "10",
    priceForOne: "20",
    unitOfMeasurement: "кг",
    expirationDate: "15",
  },
  {
    id: "02",
    productName: "Йогурт",
    countOfproducts: "30",
    priceForOne: "16",
    unitOfMeasurement: "шт",
    expirationDate: "5",
  },
  {
    id: "3",
    productName: "Хліб",
    countOfproducts: "9",
    priceForOne: "8",
    unitOfMeasurement: "шт",
    expirationDate: "-3",
  },
  {
    id: "04",
    productName: "Яблука",
    countOfproducts: "12",
    priceForOne: "5",
    unitOfMeasurement: "кг",
    expirationDate: "18",
  },
  {
    id: "04",
    productName: "Яблука",
    countOfproducts: "12",
    priceForOne: "5",
    unitOfMeasurement: "кг",
    expirationDate: "18",
  },
];

class RenderList {
  constructor(list) {
    this.list = list;
    this.DOMElement = null;
  }

  get validData() {
    //валідація даних
    for (let i = 0; i < this.list.length; i++) {
      if (
        this.list[i].countOfproducts < 0 ||
        this.list[i].priceForOne < 0 ||
        this.list[i].id < 0 ||
        this.list[i].expirationDate < 0
      ) {
        return ` invalid number is in ${i + 1} line`;
      }
    }
    return this.list;
  }

  rowTemlate(data) {
    var txt = "Close";
    if (data.id == "02") {
      // додаємо клас до айді якщо айді = 02
      return `<tr ><td class = "red" > ${data.id} </td><td> ${data.productName} </td> <td> ${data.countOfproducts} </td> <td> ${data.priceForOne} </td> <td> ${data.unitOfMeasurement} </td> <td> ${data.expirationDate} </td> <td class = "close"> ${txt} </td> <td class = "edit"> Edit </td></tr>`;
    } else {
      return `<tr><td> ${data.id} </td><td> ${data.productName} </td> <td> ${data.countOfproducts} </td> <td> ${data.priceForOne} </td> <td> ${data.unitOfMeasurement} </td> <td> ${data.expirationDate} </td> <td class = "close"> ${txt} </td><td class = "edit"> Edit </td></tr>`;
    }
  }

  render(parrent) {
    // вивід таблиці на основі списку.
    let table = document.createElement("table");
    // let rows = "";
    // for (let item of this.list){
    //     rows += this.rowTemlate(item);
    // }
    let rows = this.list.reduce(
      (rows, item) => rows + this.rowTemlate(item),
      ""
    );
    table.innerHTML = rows;
    this.DOMElement = table;
    parrent.appendChild(table);
  }

  addItem(item) {
    // додавання елементу
    this.list.push(item);
    this.DOMElement.innerHTML += this.rowTemlate(item);
  }

  removeItem() {
    // вилучення елементу за певної умови
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].countOfproducts == "9") {
        this.list.splice(i, 1);
      }
    }
    document.body.innerHTML = "";
    this.render(document.body);
    console.log(this.list);

    // let c = this.list.filter((item) => item.countOfproducts !== "9");

    // console.log(c);
  }

  closeBtn() {
    // видалення елементу при натисканні на кнопку
    var close = document.getElementsByClassName("close");
    for (let i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        var cl = this.parentElement;
        cl.style.display = "none";
      };
    }
  }

  changeColor() {
    // зміна кольору рядка якщо певний елемент задовільняє умову
    var redTxt = document.getElementsByClassName("red");
    for (let i = 0; i < redTxt.length; i++) {
      var cl = redTxt[i].parentElement;
      cl.style.color = "red";
    }
  }

  editItem() {} //на жаль, не вдалося реалізувати метод
}

let t1 = new RenderList(list);
t1.render(document.body);
console.log(t1.validData);
//t1.removeItem(); при розкоментуванні видалить рядок у якого countOfProducts = 9
t1.closeBtn();
t1.changeColor();

document.querySelector(".add").onclick = () => {
  // реалізація додавання нового еленту через форму
  let val1 = document.getElementsByClassName("id")[0].value;
  let val2 = document.getElementsByClassName("productName")[0].value;
  let val3 = document.getElementsByClassName("countOfproducts")[0].value;
  let val4 = document.getElementsByClassName("priceForOne")[0].value;
  let val5 = document.getElementsByClassName("unitOfMeasurement")[0].value;
  let val6 = document.getElementsByClassName("expirationDate")[0].value;

  t1.addItem({
    id: val1,
    productName: val2,
    countOfproducts: val3,
    priceForOne: val4,
    unitOfMeasurement: val5,
    expirationDate: val6,
  });

  console.log(t1.validData);
  t1.closeBtn();
  t1.changeColor();
};
