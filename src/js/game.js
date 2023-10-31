
import { declineWithNumerals } from '../assets/utils/declineWithNumerals';

export default class Game {
  constructor (renderConfetti, droppGame) {
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
    this._droppGame = droppGame;
  }

  updateInterval(value) {
    this._intervalElement.textContent = value;
    this._level = value;
  }

  updateRandomNumber(value) {
    this._randomNumber = value;
    this.droppAttempts();
  }

  droppAttempts() {
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
      const isEven = randomNumber % 2 === 0 ? "четное" : "нечетное";
      const hint = this._attempts % 3 === 0 ? `. Подсказка: загаданное число - ${isEven}` : '';
      if (userNumber < randomNumber) {
        this._resultText.textContent = `Попытка ${this._attempts}: ваше число (${userNumber}) меньше загаданного${hint}`;
      } else {
        this._resultText.textContent = `Попытка ${this._attempts}: ваше число (${userNumber}) больше загаданного${hint}`;
      }

    } else if (randomNumber === userNumber) {
      const attemts = declineWithNumerals(this._attempts, ['попытка', 'попытки', 'попыток']);
      this._resultBox.classList.add('answer__result-box_success', 'answer__result-box_active');
      this._resultText.textContent = `Верно! Число: ${randomNumber}. Вам потребовалось: ${this._attempts} ${attemts}.
      Чтобы начать заново - просто нажмите кнопку "Загадать число"`;
    }
  }

  //hide result box
  clearResultBox() {
    this._resultBox.classList.remove('answer__result-box_warning', 'answer__result-box_active', 'answer__result-box_success');
    this._resultText.textContent = '';
  }

  _submitAnswer() {
    if (this._userNumber > 0 && this._randomNumber > 0) {
      this._attempts++;
    }

    this._handleResultBox(this._randomNumber, this._userNumber);

    //if answer correct: show confetti and dropp game
    if (this._userNumber > 0 && this._userNumber === this._randomNumber) {
      this._renderConfetti();
      this._droppGame();
    }

    this._userNumber = undefined;
    this._answerValueElement.value = '';
  }

  setEventListeners() {

    //validate number and style submit btn
    this._answerValueElement.addEventListener('input', () => {
      const value = Number(this._answerValueElement.value);
      this.clearResultBox();
      if (value > 0 && value <= this._level) {
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
