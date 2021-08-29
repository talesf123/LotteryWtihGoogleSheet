const
  worksheet_id = '1cY0YYL67Us5SotGM3L9gIxWkGdRkDc5SuthMNaNGQjg',
  tab_name = '加油團清單',
  key = 'AIzaSyDFCqJwH8rUfPWJ5qQDxDxumUl9H_8Grgw',
  url = 'https://sheets.googleapis.com/v4/spreadsheets/'+worksheet_id+'/values/'+tab_name+'?alt=json&key='+key,
  duration = 3500; // 拉霸效果執行多久
var cheer_data, btn = $('.btn-start');
fetch(url)
  .then(res => res.json())
  .then(data => {
    var header = data.values[0];
    var all_data = data.values.slice(1).map(function(d){
      tmp = {}
      header.forEach(function(h,i){ tmp[h] = d[i] });
      return tmp
    });
    cheer_data = all_data.map(d => `${d.姓名} - ${d.電話}`).
      filter(onlyUnique).map(d => `${d.split(" - ")[0]} - ${mask(d.split(" - ")[1])}`);
    $('body').append(`<style>${spin_style(cheer_data.length)}</style>`);
    var randChk = Array.from(Array(cheer_data.length).keys());
    // 按鈕
    btn.on('click', function(e){
      e.preventDefault();
      // 禁止按鈕再被點擊
      $(this).addClass('not-allow');
      const chooseOne = toggle => {
        console.log("Sample count:" + randChk.length)
        if(randChk.length == 0){
          alert('籤筒無籤')
          return false;
        }
        // 清空、插入選項
        let input = document.querySelector('.wrap');
        input.innerHTML = '';
        for(let i = 0; i < toggle.length; i++) {
          input.insertAdjacentHTML('beforeend', '<span>' + toggle[i] + '</span>');
        }
        // 加入動畫 class name
        const list = document.querySelectorAll('.wrap > span');
        Array.prototype.forEach.call(list, l => l.classList.add('span-' + (toggle.length - 1)));
        // 亂數決定
        var ind = r(randChk.length - 1),
          ind = randChk.splice(ind, 1)[0];
        list[0].innerText = toggle[ind];
        // 移除動畫
        setTimeout(() => {
          Array.prototype.forEach.call(list, l => l.removeAttribute('class'));
          btn.removeClass('not-allow');
        }, duration);
      };
      chooseOne(cheer_data);
    });
  }
);