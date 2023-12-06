window.onload=function(){
    // 上架時記得關閉
    // Vue.config.devtools = false;
    // Vue.config.debug = false; 
    const vm = new Vue({
        el:'#app',
        data:{
            version:'v2.0.2 正式版',
            loginPageIndex:1,
            loginStart:false,
            registerStart:false,
            forgetStart:false,
            openIndex:0,
            mainPageIndex:0,
            loginSuccess:false,
            loginData:{
                user:'',
                password:'',
                code:''
            },
            registerData:{
                user:'',
                password:'',   
            },
            userInfo:{
                user:'',
                password:'',
                key:'',
                img:''
            },
            ownItem:[],
            product:[],
            allData:{},
            filterData:{},
            filterName:'all',
            product_intro:{
                id:'',
                title:'',
                price:'',
                img:{},
                intro:'',
                mail:'',
                img1:'',
                flag:'',
                key:'',
                tag:''
            },
            uploadItem:{
                title:'',
                price:'',
                intro:'',
                img1:'',
                img2:{},
                mail:'',
                tag:''
            },
            reviseProduct:{
                title:'',
                price:'',
                intro:'',
                tag:'',
                key:''
            },
            reviseProductEnabled:true,
            uploadUserImgSrc:'',
            forumItem:{},
            systemInfo:{},
            forumContent:'',
            uploadEnabled:true,
            removeEnabled:true,
            alertMsgBlock:false,
            alertOption:'',
            alertMsg:'',
            alertTimer:0,
            sortFlag:1,
            keyword:'',
            forumEnabled:true,
            forgetData:'',
            currentTime:new Date().toLocaleDateString(),
            isJsonFlag:false,
            placeholder:'輸入關鍵字查詢商品',
            reviseNotEnabled:false,
            drEnabled:true,
            sellerReserve:[],
            buyerReserve:[],
            autoGetTimer:-1,
            sysInfoReadTime:0,
            writeHolder:'輸入完畢後按下 Enter 即可發佈留言！',
            changeEnabled:true,
        },
        methods:{
            autoLogin(flag){
                if(flag==undefined && localStorage.getItem('user')!='' && localStorage.getItem('user')!=null &&
                   localStorage.getItem('password')!='' && localStorage.getItem('password')!=null &&
                   localStorage.getItem('code')!='' && localStorage.getItem('code')!=null
                ){
                    this.loginData.user=localStorage.getItem('user');
                    this.loginData.password=localStorage.getItem('password');
                    this.loginData.code=localStorage.getItem('code');
                    this.login();
                }
            },
            clearLogin(){
                this.placeholder='輸入關鍵字查詢商品';
                if(confirm('確認登出？')){
                    // reset
                    localStorage.setItem('user','');
                    localStorage.setItem('password','');
                    localStorage.setItem('code','');
                    document.getElementsByTagName('body')[0].style='background-image:;'
                    this.loginSuccess=false;
                    this.mainPageIndex=0; 
                    this.userInfo={};
                    clearInterval(this.autoGetTimer);
                    this.alert('登出成功！','check');
                }
            },
            changeLoginIndex(index){
                this.loginPageIndex=index;
            },
            register(){ // 完成
                if(this.registerData.user=='' || this.registerData.password=='') this.alert('請勿空白','error');
                else{
                    this.registerStart=true;
                    this.alert('註冊中，請稍候','warn',3250);
                    const url='https://script.google.com/macros/s/AKfycbx2t2A8HXmH6LoFs8LvjQwUoP84Lt0nZtOBaq4Lo5Gy29i3sBmXsJgc2k9yOPTKz4YA/exec';
                    var formData=new FormData();
                    formData.append('user',this.registerData.user);
                    formData.append('password',this.registerData.password);
                    var config={
                        method:'post',
                        body:formData,
                        redirect:'follow'
                    }
                    fetch(url,config)
                    .then(resp=>resp.text())
                    .then(resp=>{
                        if(resp=='註冊成功'){
                            this.alert('註冊成功！','check');
                            this.loginPageIndex=1;
                        }
                        else this.alert(resp,'error');
                        this.registerStart=false;
                    })
                }
            },
            login(){ // 完成
                if(this.loginData.user=='' || this.loginData.password=='' || this.loginData.code=='') this.alert('請勿空白','error');
                else if(!this.loginSuccess){ // 阻擋二次驗證
                    this.loginStart=true;
                    this.alert('驗證中，請稍候','warn',3250);
                    const url='https://script.google.com/macros/s/AKfycbxzc-Y24hMPll7xajuCAZAw32Ol3JGtccHpmhKy7BHex9fyh_KmbzYxAeuvJIu_h6Cj/exec';
                    var formData=new FormData();
                    formData.append('user',this.loginData.user);
                    formData.append('password',this.loginData.password);
                    formData.append('code',this.loginData.code);
                    var config={
                        method:'post',
                        body:formData,
                        redirect:'follow'
                    }
                    fetch(url,config)
                    .then(resp=>resp.text())
                    .then(resp=>{
                        if(resp=='登入成功'){
                            this.alert('登入成功！','check');
                            this.loginSuccess=true;
                            localStorage.setItem('user',this.loginData.user);
                            localStorage.setItem('password',this.loginData.password);
                            localStorage.setItem('code',this.loginData.code);
                            this.init();
                            this.getOwner();
                        }
                        else this.alert(resp,'error');
                        this.loginStart=false;
                    })
                }
            },
            // 刷新
            getProduct(flag){ // 完成
                const url='https://script.google.com/macros/s/AKfycbwZKoSuxANAEYGfHdvy7J3NwOrtbVpjJIWFIXL4bjcG6vzaGnfbxl95vDTJvorJzbMiPg/exec';
                var config={
                    method:"GET",
                    redirect: 'follow'
                }
                fetch(url,config)
                .then(resp=>{
                    vm.autoLogin(flag); // 延遲自動登入
                    return resp.json();
                })
                .then(resp=>{ 
                    this.product=resp;
                    this.allData=resp;
                    this.sort(flag);
                    if(flag=='auto'){
                        var fr =document.getElementById('fr');
                        fr.classList.remove('fa-spin');
                        this.alert('刷新成功','check')
                    }
                })
            },
            showFilter(){
                var target = document.getElementById('filterBar');
                var fil =document.getElementById('fil');
                fil.classList.toggle('showRadio')
                target.classList.toggle('showBar');
            },
            openItem(id,title,price,img,intro,mail,key,img1,flag,tag){
                this.product_intro={
                    id:id,
                    title:title,
                    price:price,
                    img:JSON.parse(img),
                    intro:intro,
                    mail:mail,
                    key:key,
                    img1:img1,
                    flag:flag,
                    tag:tag
                }
                this.openIndex=1;
            },
            isJSON(str){
                try {
                    JSON.parse(str);
                } catch (e) {
                    return false;
                }
                return true;
            },
            isForumInput(){
                window.addEventListener('keydown',(e)=>{
                    if(this.mainPageIndex==1){
                        if(e.code=='Enter'){
                            if(this.forumContent==''){}
                            else if(!this.forumEnabled) this.alert('發布進行中，請稍待片刻','warn');
                            else this.uploadForum();
                        }
                    }
                })
            },
            closeItem(){
                this.openIndex=0;
            },
            main(index,placeholder){
                this.mainPageIndex=index;
                this.closeItem();
                this.keyword='';
                this.placeholder=placeholder;
                if(index==7) this.sysInfoReadTime=new Date().getTime();
            },
            openWindow(index,obj){
                this.openIndex=index;
                if(index==3){
                    this.reviseProduct=obj;
                } 
            },
            removeItem(key,title,price){ // 完成
                if(confirm('確認下架商品？') && key!=undefined && key!=''){
                    this.removeEnabled=false;
                    this.alert('下架中，請稍候','warn',10500);
                    const url='https://script.google.com/macros/s/AKfycbxTLLxxmJXJYC7z3ZaVeaSF3xbtxWPwZ530j5UjjITgqfPLT0nncpB3wpR7mDGP6hgB/exec';
                    var formData=new FormData();
                    formData.append('seller',this.loginData.user);
                    formData.append('key',key);
                    formData.append('title',title);
                    formData.append('price',price);
                    var config={
                        method:'post',
                        body:formData,
                        redirect:'follow'
                    }
                    fetch(url,config)
                    .then(resp=>resp.text())
                    .then(resp=>{
                        if(resp=='下架成功'){
                            this.alert('下架成功！','check',15000);
                            this.closeItem();
                            this.refresh('auto');
                        }
                        else this.alert('下架失敗','error');
                        this.removeEnabled=true;
                    })
                }
            },
            addItem(){ // 完成
                if(this.uploadItem.title=='' || this.uploadItem.price=='' || this.uploadItem.intro=='' || this.uploadItem.img1=='' || this.uploadItem.img2=='' || this.uploadItem.mail=='' || this.uploadItem.tag==''){
                    this.alert('不可空白','error');
                }
                else if(!new RegExp('^[0-9]*$').test(this.uploadItem.price)){
                    this.alert('價格只能輸入數字','error');
                }
                else if(confirm('確認上架？')){
                    this.uploadEnabled=false; // 鎖定上架功能
                    this.alert('上架中，請稍候','warn',10250);
                    const url='https://script.google.com/macros/s/AKfycbx8XijGo-r-Yu9aIbL8F4ySPq-NqBCs35ISpf0T-hWM9ULTk5apA80AehVSoEE0Zrrwkg/exec';
                    var formData=new FormData();
                    formData.append('title',this.uploadItem.title);
                    formData.append('price',this.uploadItem.price);
                    formData.append('intro',this.uploadItem.intro);
                    formData.append('img1',this.uploadItem.img1);
                    formData.append('img2',JSON.stringify(this.uploadItem.img2));
                    formData.append('mail',this.uploadItem.mail);
                    formData.append('tag',this.uploadItem.tag);
                    var config={
                        method:'post',
                        body:formData,
                        redirect:'follow'
                    }
                    fetch(url,config)
                    .then(resp=>resp.text())
                    .then(resp=>{
                        if(resp=='上架成功'){
                            this.alert('上架成功！','check');
                            this.refresh('auto');
                            this.resetUpload();
                        }
                        else this.alert('上架失敗','error');
                        this.uploadEnabled=true; // 開啟上架功能
                    })
                }
                
            },
            reviseProductStart(){ // 完成
                if(this.reviseProduct.title=='' || this.reviseProduct.price=='' || this.reviseProduct.intro=='' || this.reviseProduct.tag==undefined){
                    this.alert('不可空白','error');
                }
                else if(!new RegExp('^[0-9]*$').test(this.reviseProduct.price)){
                    this.alert('價格只能輸入數字','error');
                }
                else if(confirm('確認修改商品？')){
                    this.reviseProductEnabled=false;
                    this.alert('修改中，請稍候','warn',10500);
                    const url='https://script.google.com/macros/s/AKfycbwidDfB15oR8rKealgZUg0RjSqr-7OS0dcUYKGksui1Zb-11HVNwocD_HqwQ59iRBWW/exec';
                    var formData=new FormData();
                    formData.append('title',this.reviseProduct.title);
                    formData.append('price',this.reviseProduct.price);
                    formData.append('intro',this.reviseProduct.intro);
                    formData.append('tag',this.reviseProduct.tag);
                    formData.append('key',this.reviseProduct.key);
                    var config={
                        method:'post',
                        body:formData,
                        redirect:'follow'
                    }
                    fetch(url,config)
                    .then(resp=>resp.text())
                    .then(resp=>{
                        if(resp=='success'){
                            this.refresh('auto');
                            this.alert('修改成功！','check',15000);
                            this.reviseProduct={};
                            this.closeItem();
                        }
                        else this.alert('修改失敗','error');
                        this.reviseProductEnabled=true;
                    })
                }
            },
            reserve(title,img,price,intro,mail,key){ // 完成
                if(confirm('確認預約？')){
                    this.alert('預約中，請稍候','warn',13250);
                    const url='https://script.google.com/macros/s/AKfycbzaiaKQuSJXipu-K3vv8NaD5WyLQ6yk4VbXRjcVq_YlWfdE_-DVGxHHn71_QzlJSfbG/exec';
                    var formData=new FormData();
                    formData.append('buyer',this.loginData.user);
                    formData.append('seller',mail);
                    formData.append('title',title);
                    formData.append('img',img);
                    formData.append('price',price);
                    formData.append('intro',intro);
                    formData.append('key',key);
                    var config={
                        method:'post',
                        body:formData,
                        redirect:'follow'
                    }
                    fetch(url,config)
                    .then(resp=>resp.text())
                    .then(resp=>{
                       if(resp=='預約成功'){
                            this.alert('預約成功！','check');
                            setTimeout(() => { // 延遲刷新
                                this.refresh('auto');
                            }, 250);
                        }
                        else if(resp=='product not found'){
                            this.alert('商品已下架，請重新挑選！','error');
                            this.refresh('auto');
                        }
                        else this.alert('預約失敗','error');
                    })
                }
            },
            // 刷新
            getOwner(){ // 完成
                const url='https://script.google.com/macros/s/AKfycbyIcMtdiJkoFtGkRHxW8nDMtfapjl7dTreczTnyJrM6R_WDDkHxSMldTr3W7kSpHcEnAg/exec';
                var formData=new FormData();
                formData.append('mail',this.loginData.user);
                var config={
                    method:"POST",
                    body:formData,
                    redirect: 'follow'
                }
                fetch(url,config)
                .then(resp=>resp.json())
                .then(resp=>{
                    this.ownItem=resp
                })
            },
            init(){
                this.uploadItem.mail=this.loginData.user;
                document.getElementsByTagName('body')[0].style='background-image: url(img/bg2.jpg);'
                this.getUserInfo();
                this.getReserveBySeller();
                this.getReserveByBuyer();
                this.autoGet();
                this.getSystemInfo();
                // 事件綁定
                this.isForumInput();
            },
            refresh(flag){
                this.getProduct(flag);
                this.getOwner();
                this.getForum();
                this.getReserveBySeller();
                this.getReserveByBuyer();
                this.getUserInfo('auto');
                this.getSystemInfo();
            },
            spinRefresh(){
                var fr =document.getElementById('fr');
                if(confirm('確認刷新？')){
                    this.alert('刷新商品列','warn',15250);
                    fr.classList.add('fa-spin')
                    this.refresh('auto');
                }
            },
            systemRefresh(){
                var msgScroll= document.getElementById('msgScroll');
                if(msgScroll.scrollTop==0) {
                    this.alert('刷新系統通知','warn',3000);
                    document.getElementById('forum-spin').style='display:flex;';
                    msgScroll.classList.add('content-control2-refresh');
                    this.getSystemInfo('auto');
                }
            },
            alert(msg,option,interval){
                if(interval==undefined) interval=1350;
                clearTimeout(this.alertTimer)
                this.alertMsgBlock=true;
                this.alertMsg=msg;
                this.alertOption=option;
                this.alertTimer = setTimeout(() => {
                    this.alertMsgBlock=false;
                }, interval);
            },
            sort(flag){
                if(flag=='auto') this.product.sort((a,b)=> this.sortFlag==2?a.price-b.price:b.price-a.price);
                else if(this.sortFlag==1) { //由低至高
                    this.product.sort((a,b)=>a.price-b.price);
                    this.sortFlag=2;
                }
                else{ // 由高至低
                    this.product.sort((a,b)=>b.price-a.price);
                    this.sortFlag=1;
                }
            },
            resetUpload(){
                this.uploadItem.title='';
                this.uploadItem.price='';
                this.uploadItem.intro='';
                this.uploadItem.img1='';
                this.uploadItem.img2=[];
                this.uploadItem.tag='';
                document.getElementById('upload1').value='';
                document.getElementById('upload2').value='';
            },
            uploadUserImg(){
                var dom = document.getElementById('headImg');
                dom.click();
            },
            uploadUserImgStart(){
                this.alert('頭像上傳中，請稍候！','warn',15000);
                var dom = document.getElementById('headImg');
                if(dom!=null){
                    var file = dom.files[0];
                    var reader =new FileReader();
                    if(file) reader.readAsDataURL(file);
                    reader.addEventListener("load", () => {
                       if(file.size>300000) this.alert('檔案大於 300kB 請重新上傳。','error');
                       else this.compressHead(reader.result);
                       dom.value='';
                    }, false);
                }
            },
            uploadUserImgFetch(){
                const url='https://script.google.com/macros/s/AKfycbyJkmcna66TKgTNqXgUyW0Zd8erBiR_FCe-XT4ZmoALEH6u9kgWHfWFa1KjabnYY0RZ/exec';
                    var formData=new FormData();
                    formData.append('user',this.loginData.user);
                    formData.append('img',this.uploadUserImgSrc);
                    var config={
                        method:"POST",
                        body:formData,
                        redirect: 'follow'
                    }
                    fetch(url,config)
                    .then(resp=>resp.text())
                    .then(resp=>{
                        if(resp=='success'){
                            this.alert('頭像上傳成功','check');
                            this.getUserInfo('auto');
                        }
                        else this.alert('頭像上傳失敗','error');
                    })
            },
            uploadFile(){
                this.alert('圖片上傳中，請稍候','warn');
                if(document.getElementById('upload1')!=null){
                    var file = document.getElementById('upload1').files[0];
                    var reader = new FileReader();
                    if (file) reader.readAsDataURL(file);
                    reader.addEventListener("load", () => {
                        if(file.size>3000000) this.alert('檔案大於 3MB 請重新上傳。','error');
                        else this.compressImg(reader.result,'img1');
                    }, false);
                }
            },
            uploadFiles(option,index){
                if(option != 'auto') var index=0;
                this.alert('圖片上傳中，請稍候','warn');
                if(document.getElementById('upload2')!=null){
                    var files = document.getElementById('upload2').files;
                    var reader = new FileReader();
                    var file = files[index];
                    if (file) reader.readAsDataURL(file);
                    reader.addEventListener("load", () => {
                        if(file.size>3000000) this.alert('檔案大於 3MB 請重新上傳。','error');
                        else if(file!=undefined && file!=null && index<3) this.compressImgs(reader.result,'img2',index);
                        else this.alert('超過上傳上限三張圖！','warn');
                        
                    }, false);     
                }
            },
            compressHead(item){
                var img =new Image();
                img.src=item;
                document.body.appendChild(img);
                img.onload=()=>{
                    // 取得原始長寬
                    var width=img.offsetWidth;
                    var height=img.offsetHeight;
                    document.body.removeChild(img);
                    // 調整大小
                    img.width=width>=260?260:width;
                    img.height=width>=260?height*(260/width):height;
                    // 設定畫布大小
                    var canvas = document.getElementById('canvas');
                    canvas.width=img.width;
                    canvas.height=img.height;
                    // 開始繪製
                    var ctx =canvas.getContext('2d');
                    ctx.drawImage(img,0,0,img.width,img.height);
                    // 壓縮圖檔
                    this.uploadUserImgSrc= canvas.toDataURL('image/jpeg',0.9);
                    this.userInfo.img=canvas.toDataURL('image/jpeg',0.9);
                    this.uploadUserImgFetch();
                }
            },
            compressImg(item,target){
                var img =new Image();
                img.src=item;
                document.body.appendChild(img);
                img.onload=()=>{
                    // 取得原始長寬
                    var width=img.offsetWidth;
                    var height=img.offsetHeight;
                    document.body.removeChild(img);
                    // 調整大小
                    img.width=width>=510?510:width;
                    img.height=width>=510?height*(510/width):height;
                    // 設定畫布大小
                    var canvas = document.getElementById('canvas');
                    canvas.width=img.width;
                    canvas.height=img.height;
                    // 開始繪製
                    var ctx =canvas.getContext('2d');
                    ctx.drawImage(img,0,0,img.width,img.height);
                    // 壓縮圖檔
                    this.uploadItem[target]= canvas.toDataURL('image/jpeg',0.9);
                    this.alert('圖片上傳完畢','check');
                }
            },
            compressImgs(item,target,index){
                var img =new Image();
                img.src=item;
                document.body.appendChild(img);
                img.onload=()=>{
                    // 取得原始長寬
                    var width=img.offsetWidth;
                    var height=img.offsetHeight;
                    document.body.removeChild(img);
                    // 調整大小
                    img.width=width>=510?510:width;
                    img.height=width>=510?height*(510/width):height;
                    // 設定畫布大小
                    var canvas = document.getElementById('canvas');
                    canvas.width=img.width;
                    canvas.height=img.height;
                    // 開始繪製
                    var ctx =canvas.getContext('2d');
                    ctx.drawImage(img,0,0,img.width,img.height);
                    // 壓縮圖檔
                    this.uploadItem[target][index]= canvas.toDataURL('image/jpeg',0.9);
                    this.uploadFiles('auto',++index)
                    this.alert('圖片上傳完畢','check');
                }
            },
            uploadForum(){ // 完成
                if(this.forumContent=='' || this.forumContent.trim()=='') this.alert('上傳資料不可為空','error');
                else{
                    this.forumEnabled=false;
                    this.writeHolder='資料發送中，請稍候再輸入！';
                    this.alert('發佈中，請稍候！','warn',15500);
                    const url='https://script.google.com/macros/s/AKfycbwDJrM4zdqDMqky9JI9t6bR5kpKbg6iElhzZhYJNom_aO5qjLAcfYSe5H9q870p4sXWlQ/exec';
                    var formData=new FormData();
                    formData.append('user',this.loginData.user);
                    formData.append('content',this.forumContent);
                    var config={
                        method:"POST",
                        body:formData,
                        redirect: 'follow'
                    }
                    this.forumContent=''; // 要放在這裡
                    fetch(url,config)
                    .then(resp=>resp.text())
                    .then(resp=>{
                        if(resp=='success') {
                            this.alert('發布成功','check');
                            this.getForum();
                        }
                        else this.alert('發布失敗','error');
                        this.forumEnabled=true;
                        this.writeHolder='輸入完畢後按下 Enter 即可發佈留言！'
                    })
                }
            },
            getForum(){ // 完成
                const url='https://script.google.com/macros/s/AKfycbwDJrM4zdqDMqky9JI9t6bR5kpKbg6iElhzZhYJNom_aO5qjLAcfYSe5H9q870p4sXWlQ/exec';
                var config={
                    method:"GET",
                    redirect: 'follow'
                }
                fetch(url,config)
                .then(resp=>resp.json())
                .then(resp=>{
                    this.forumItem=resp.reverse();
                })
            },
            deleteForum(key,index){ // 完成
                if(confirm('確認刪除留言？')){
                    this.alert('刪除留言中，請稍候','warn',10000)
                    const url='https://script.google.com/macros/s/AKfycbxn-iC-Gmod1VtShykPyWoUDZ-HozlJDq225F2MYbJFtpgmkmpy9AZHWTAkqLkLhQ89dw/exec';
                    var formData=new FormData();
                    formData.append('key',key);
                    var config={
                        method:"POST",
                        body:formData,
                        redirect: 'follow'
                    }
                    fetch(url,config)
                    .then(resp=>resp.text())
                    .then(resp=>{
                        if(resp=='success'){
                            this.alert('刪除成功','check');
                            this.getForum();
                        }
                        else this.alert('刪除失敗','error');
                        this.toggleMenu(index);
                    })
                }
            },
            toggleMenu(index){
                document.getElementById('menu'+index).classList.toggle('menuShow');
            },
            forgetUser(){ // 完成
                if(this.forgetData=='' || this.forgetData.trim()=='') this.alert('請勿空白','error');
                else{
                    this.forgetStart=true;
                    this.alert('傳送資料至信箱中，請稍候','warn',3200)
                    const url='https://script.google.com/macros/s/AKfycby7hagxJLQTtjbGTi11SxEFq9fKIHcO0oRzTOJNQPeq_fsj3jK5jjC9fffva1U4ilPjsA/exec';
                    var formData=new FormData();
                    formData.append('user',this.forgetData);
                    var config={
                        method:"POST",
                        body:formData,
                        redirect: 'follow'
                    }
                    fetch(url,config)
                    .then(resp=>resp.text())
                    .then(resp=>{
                        if(resp=='success'){
                            this.alert('資料已傳送至信箱中','check');
                            this.loginPageIndex=1;
                        }
                        else this.alert('資料傳送失敗','error');
                        this.forgetStart=false;
                    })
                }
            },
            contentImg(id,arr,method){
                var box =document.getElementById(id);
                var length= Object.keys(arr).length;
                var ps = window.getComputedStyle(box).getPropertyValue("left").split("px")[0];
                if(this.changeEnabled){
                    this.changeEnabled=false;
                    if(method==1){
                        if(ps==-(335.5*(length-1))) box.style.left ='0px';
                        else box.style.left=(ps-335.5)+"px";
                    }
                    if(method==2){
                        if(ps<0) box.style.left=(+ps+335.5)+"px";
                        else box.style.left =-(335.5*(length-1))+'px';
                    }
                    setTimeout(()=>this.changeEnabled=true,310);
                }
            },
            copy(item){
                this.alert('複製成功','check');
                navigator.clipboard.writeText(item);
            },
            toggleEye(index){
                var eye  = document.getElementsByClassName('eye_open')[index];
                var input =document.getElementsByClassName('loginP')[index];
                var target =eye.classList;
                target.toString().includes('fa-eye-slash')?target.replace('fa-eye-slash','fa-eye'):target.replace('fa-eye','fa-eye-slash')
                input.type=='password'?input.type='text':input.type='password';
            },
            deleteReserve(key){ // 完成
                const url='https://script.google.com/macros/s/AKfycbzHPJ_iqjOdDKXTtxIWCaFkXsdXRyONjyO_jiC4UfHKxkxWYoX8HNfoGGXaycpApzys7g/exec';
                var formData=new FormData();
                formData.append('user',this.loginData.user);
                formData.append('key',key);
                var config={
                    method:"POST",
                    body:formData,
                    redirect: 'follow'
                }
                if(confirm('確認刪除預約？')){
                    this.drEnabled=false;
                    this.alert('刪除訂單中，請稍候！','warn',15000);
                    fetch(url,config)
                    .then(resp=>resp.text())
                    .then(resp=>{
                        if(resp=='success'){
                            this.refresh('auto');
                            this.alert('刪除訂單成功','check');
                        }
                        else this.alert('刪除訂單失敗！','error');
                        this.drEnabled=true;
                    })
                }
                
            },
            finishOrder(key){ // 完成
                const url='https://script.google.com/macros/s/AKfycbwkKgGaLQg8yi-86BAWXkNEmGIYLVTCuv7IHjw857aZpxVsOL2QoqwXztMpC2zXYEvo/exec';
                var formData=new FormData();
                formData.append('user',this.loginData.user);
                formData.append('key',key);
                var config={
                    method:"POST",
                    body:formData,
                    redirect: 'follow'
                }
                if(confirm('確認完成訂單？')){
                    this.drEnabled=false;
                    this.alert('紀錄訂單中，請稍候！','warn',15000);
                    fetch(url,config)
                    .then(resp=>resp.text())
                    .then(resp=>{
                        if(resp=='success'){
                            this.refresh('auto');
                            this.alert('紀錄成功','check');
                        }
                        else this.alert('紀錄失敗！','error');
                        this.drEnabled=true;
                    })
                }
                
            },
            autoGet(){
                this.autoGetTimer = setInterval(()=>{
                    this.getReserveByBuyer();
                    this.getReserveBySeller();
                    this.getSystemInfo();
                    this.getForum();
                },10000);
            },
            getReserveByBuyer(){ // 完成
                const url='https://script.google.com/macros/s/AKfycbxQ2laPQYNiRbSUcg6Li9paQO08vPKju4SdA7wYqtPxlsm4fme-gM4eJf-wv3wmyNgP/exec';
                var formData=new FormData();
                formData.append('user',this.loginData.user);
                var config={
                    method:"POST",
                    body:formData,
                    redirect: 'follow'
                }
                fetch(url,config)
                .then(resp=>resp.json())
                .then(resp=>{
                    this.buyerReserve=resp;
                })
            },
            getReserveBySeller(){ // 完成
                const url='https://script.google.com/macros/s/AKfycbxQsSFbYZJOP2_do2pf3s4ndscKLatHwYjrvOTwo7XW4LCq5BwX79gCwr6pPYOakdDC/exec';
                var formData=new FormData();
                formData.append('user',this.loginData.user);
                var config={
                    method:"POST",
                    body:formData,
                    redirect: 'follow'
                }
                fetch(url,config)
                .then(resp=>resp.json())
                .then(resp=>{
                    this.sellerReserve=resp;
                })
            },
            getUserInfo(flag){ // 完成
                if(flag==undefined) this.alert('正在取得使用者資料','warn',15500);
                const url='https://script.google.com/macros/s/AKfycbwnAVDTGdCJ7TzbmTaBGl8cVOJMRaQaiTnahKwfYRqWY-NZK6ORfkfiXXN56SXdGJ4/exec';
                var formData=new FormData();
                formData.append('user',this.loginData.user);
                formData.append('password',this.loginData.password);
                formData.append('key',this.loginData.code);
                var config={
                    method:"POST",
                    body:formData,
                    redirect: 'follow'
                }
                fetch(url,config)
                .then(resp=>resp.json())
                .then(resp=>{
                    if(resp=='failed') this.alert('無法取得使用者資訊','error');
                    else{
                        this.userInfo=resp;
                        if(this.userInfo.img=='') this.userInfo.img='ico/apple-icon-max.png'
                        if(flag==undefined) this.alert('順利取得使用者資訊','check')
                    }
                })
            },
            reviseUserInfo(){ // 完成
                this.alert('使用者資料更新中','warn',15500);
                this.reviseNotEnabled=true;
                const url='https://script.google.com/macros/s/AKfycbwWMdoU_1kOjEfwNtfCq7IFTqqzusLWIci6HTwcwBoMkJtmDr3PT3nbalqN2BYh7F0-tQ/exec';
                var formData=new FormData();
                formData.append('user',this.userInfo.user);
                formData.append('password',this.userInfo.password);
                formData.append('key',this.userInfo.key);
                var config={
                    method:"POST",
                    body:formData,
                    redirect: 'follow'
                }
                fetch(url,config)
                .then(resp=>resp.text())
                .then(resp=>{
                    if(resp=='failed') this.alert('使用者資料更新失敗','error');
                    else{
                        this.loginData.user=this.userInfo.user;
                        this.loginData.password=this.userInfo.password;
                        this.loginData.code=this.userInfo.key;
                        localStorage.setItem('password',this.userInfo.password);
                        localStorage.setItem('code',this.userInfo.key);
                        this.getUserInfo('auto');
                        this.alert('使用者資料更新成功','check');
                        this.reviseNotEnabled=false;
                    }
                })
            },
            toggleSrList(index){
                var dom = document.getElementsByClassName('srlist');
                var arrow =document.getElementsByClassName('oc');
                for(var i=0;i<dom.length;i++){
                    dom[i].classList.toString().includes('sr-title-expand')?dom[i].classList.remove('sr-title-expand'):dom[i].classList.add('sr-title-expand');
                    arrow[i].classList.toString().includes('fa-chevron-up')?arrow[i].classList.replace('fa-chevron-up','fa-chevron-down'):arrow[i].classList.replace('fa-chevron-down','fa-chevron-up');
                    if(i!=index){
                        dom[i].classList.toString().includes('sr-title-expand')?dom[i].classList.remove('sr-title-expand'):'';
                        arrow[i].classList.toString().includes('fa-chevron-down')?arrow[i].classList.replace('fa-chevron-down','fa-chevron-up'):'';
                    }
                }
            },
            getSystemInfo(flag){
                const url='https://script.google.com/macros/s/AKfycbyTTUXkLBtUTbjMDSQY8Oi5JyTUs0jQkvWdVPtXEJBV-MVmvETT-gOErjjv9efI51ucog/exec';
                var formData=new FormData();
                formData.append('user',this.loginData.user);
                var config={
                    method:"POST",
                    body:formData,
                    redirect: 'follow'
                }
                fetch(url,config)
                .then(resp=>resp.json())
                .then(resp=>{
                    this.systemInfo=resp.reverse();
                    if(flag=='auto') {
                        var msgScroll= document.getElementById('msgScroll');
                        this.alert('刷新成功','check');
                        document.getElementById('forum-spin').style='display:none;';
                        msgScroll.classList.remove('content-control2-refresh');
                    }
                })
            }
        }
    })
    vm.alert('歡迎蒞臨本頁面','check');
    vm.getProduct();
    vm.getForum();
    //ToolDisabled(); // --> 正式上架時，記得關閉。
}
function ToolDisabled(){
    window.oncontextmenu=function(){return false;} 
    window.onkeydown = window.onkeyup = window.onkeypress = function () { 
        if (window.event.keyCode == 123) {
            window.event.returnValue = false;
            return false;
        }
    } 
}
