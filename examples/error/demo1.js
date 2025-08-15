function yideng() {
  console.log(index);
}
document.getElementById('js-btn-error').addEventListener('click', () => {
  //故意输出未赋值的变量
  yideng();
});

document.getElementById('js-img').setAttribute('src', '404.png');
