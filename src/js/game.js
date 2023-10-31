
export default class Game {
  constructor (renderConfetti) {
    this._intervalElement = document.querySelector('.answer__interval-end');
    this._answerValueElement = document.querySelector('.asnwer__value');
    this._submitBtn = document.querySelector('.answer__sbt-btn');
    this._resultBox = document.querySelector('.answer__result-box');
    this._resultText = document.querySelector('.answer__result-value');
    this._level = 100;
    this._userNumber;
    this._randomNumber = 0;
    this._attempts = 0;
    this._renderConfetti = renderConfetti;
  }

  updateInterval(value) {
    this._intervalElement.textContent = value;
    this._level = value;
  }

  updateRandomNumber(value) {
    this._randomNumber = value;
    this._attempts = 0;
  }

  //handle result box
  _handleResultBox(randomNumber, userNumber) {
    if (randomNumber === 0) {
      this._resultBox.classList.add('answer__result-box_warning', 'answer__result-box_active');
      this._resultText.textContent = 'Не забудьте нажать кнопку "Загадать число"';

    } else if (userNumber < 1 || userNumber > this._level) {
      this._resultBox.classList.add('answer__result-box_warning', 'answer__result-box_active');
      this._resultText.textContent = `Диапазон чисел от 1 до ${this._level}. Кажется, ваше число в него не попадает :(`;

    } else if (!userNumber) {
      this._resultBox.classList.add('answer__result-box_warning', 'answer__result-box_active');
      this._resultText.textContent = `Не забудьте добавить свое число в поле выше`;

    } else if (randomNumber !== userNumber) {
      this._resultBox.classList.add('answer__result-box_warning', 'answer__result-box_active');
      if (userNumber < randomNumber) {
        this._resultText.textContent = `Попытка ${this._attempts}: ваше число (${userNumber}) меньше загаданного`;
      } else {
        this._resultText.textContent = `Попытка ${this._attempts}: ваше число (${userNumber}) больше загаданного`;
      }

    } else if (randomNumber === userNumber) {
      this._resultBox.classList.add('answer__result-box_success', 'answer__result-box_active');
      this._resultText.textContent = `Верно! Число: ${randomNumber}. Вам потребовалось: 3 попытки`;
    }
  }

  //hide result box
  clearResultBox() {
    this._resultBox.classList.remove('answer__result-box_warning', 'answer__result-box_active', 'answer__result-box_success');
    this._resultText.textContent = '';
  }

  _submitAnswer() {
    console.log(this._userNumber, this._randomNumber)

    if (this._userNumber > 0 && this._randomNumber > 0) {
      this._attempts++;
    }

    if (this._userNumber > 0 && this._userNumber === this._randomNumber) {
      this._renderConfetti();
    }

    this._handleResultBox(this._randomNumber, this._userNumber)
    this._userNumber = undefined;
    this._answerValueElement.value = '';
  }

  setEventListeners() {

    //validate number and style submit btn
    this._answerValueElement.addEventListener('input', () => {
      const value = Number(this._answerValueElement.value);
      this.clearResultBox();
      if (value > 0) {
        this._submitBtn.classList.add('answer__sbt-btn_active');
      } else {
        this._submitBtn.classList.remove('answer__sbt-btn_active');
      }
      this._userNumber = value;
    })

    //handle submit
    this._submitBtn.addEventListener('click', () => this._submitAnswer());

  }
}
