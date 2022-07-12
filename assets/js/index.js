const
  queryString = window.location.search,
  urlParams = new URLSearchParams(queryString),
  worksheet_id = urlParams.get('worksheet_id'),
  tab_name = urlParams.get('tab_name'),
  key = urlParams.get('key');

if(!worksheet_id || !tab_name || !key){
  alert('參數有漏')
}else{
  const
    url = 'https://sheets.googleapis.com/v4/spreadsheets/'+worksheet_id+'/values/'+tab_name+'?alt=json&key='+key,
    duration = 3500; // 拉霸效果執行多久
  var cheer_data, btn = $('.btn-start');
  fetch(url)
    .then(res => res.json())
    .then(data => {
      var header = data.values[0], keys = {};
      var all_data = data.values.slice(1).map(function(d){
        tmp = {}
        header.forEach(function(h,i){ tmp[h] = d[i] });
        //未滿18歲不能算加油團
        if(tmp['是否已滿18歲?'] != '是') return undefined;
        tmp['電話'] = mask(tmp['電話']);
        if(keys[`${tmp.姓名} - ${tmp.電話}`] == undefined){
          keys[`${tmp.姓名} - ${tmp.電話}`] = 1;
        }else{
          tmp = undefined;
        }
        return tmp
      }).filter(d => d);
      cheer_data = all_data.map(d => `${d.姓名} - ${d.電話}`);
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
}