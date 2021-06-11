/*
example:
google sheet url:https://docs.google.com/spreadsheets/d/gbnm1212fdsf5454g5fds4g5fd4sngf/edit#gid=0
google_file_feed_id = 'gbnm1212fdsf5454g5fds4g5fd4sngf'
*/
const 
  google_file_feed_id = '1cY0YYL67Us5SotGM3L9gIxWkGdRkDc5SuthMNaNGQjg',
  url = `https://spreadsheets.google.com/feeds/list/${google_file_feed_id}/1/public/values?alt=json`,
  duration = 3500; // 拉霸效果執行多久
var cheer_data, btn = $('.btn-start');
fetch(url)
  .then(res => res.json())
  .then(data => {
    var all_data = data.feed.entry;
    cheer_data = all_data.map(d => `${d.gsx$姓名.$t} - ${d.gsx$電話.$t}`).
      filter(onlyUnique).map(d => `${d.split(" - ")[0]} - ${mask(d.split(" - ")[1])}`);
    $('body').append(`<style>${spin_style(cheer_data.length)}</style>`);
    let txt; // 結果
    // 按鈕
    btn.on('click', function(e){
      e.preventDefault();
      // 禁止按鈕再被點擊
      $(this).addClass('not-allow');
      const chooseShop = toggle => {
        // 清空、插入選項
        let input = document.querySelector('.wrap');
        input.innerHTML = '';
        for(let i = 0; i < toggle.length; i++) {
          input.insertAdjacentHTML('beforeend', '<span>' + toggle[i] + '</span>');
        }
        // 加入動畫 class name
        const list = document.querySelectorAll('.wrap > span');
        Array.prototype.forEach.call(list, l => l.classList.add('span-' + (toggle.length - 1)));
        // 亂數決定中選店家
        let max = toggle.length - 1;
        txt = toggle[r(max)];
        list[0].innerText = txt;
        
        // 移除動畫
        setTimeout(() => {
          Array.prototype.forEach.call(list, l => l.removeAttribute('class'));
          btn.removeClass('not-allow')
        }, duration);
      };
      chooseShop(cheer_data);
    });
  }
);