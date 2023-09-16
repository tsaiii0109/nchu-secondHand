window.onload=function(){
    // 上架時記得關閉
    // Vue.config.devtools = false;
    // Vue.config.debug = false; 
    const vm = new Vue({
        el:'#app',
        data:{
            loginPageIndex:1,
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
            ownItem:[],
            product:[],
            allData:{},
            filterData:{},
            filterName:'all',
            product_intro:{
                id:'',
                title:'',
                price:'',
                img:'',
                intro:'',
                mail:''
            },
            uploadItem:{
                title:'',
                price:'',
                intro:'',
                img1:'',
                img2:'',
                mail:'',
                tag:''
            },
            forumItem:{},
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
        },
        methods:{
            autoLogin(){
                if(localStorage.getItem('user')!='' && localStorage.getItem('user')!=null &&
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
                if(confirm('確認登出？')){
                    // reset
                    localStorage.setItem('user','');
                    localStorage.setItem('password','');
                    localStorage.setItem('code','');
                    document.getElementsByTagName('body')[0].style='background-image:;'
                    this.loginSuccess=false;
                    this.mainPageIndex=0; 
                    this.alert('登出成功！','check');
                }
            },
            changeLoginIndex(index){
                this.loginPageIndex=index;
            },
            register(){
                if(this.registerData.user=='' || this.registerData.password=='') this.alert('請勿空白','error');
                else{
                    this.alert('註冊中，請稍候','warn');
                    const url='https://script.google.com/macros/s/AKfycbxi_yFk9qK4uV2xlUlu7Q3BDNcQaDYWO1XaTeqSJ815qw5KunriNkJmMHbt1hK38HfU2A/exec';
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
                    })
                }
            },
            login(){
                if(this.loginData.user=='' || this.loginData.password=='' || this.loginData.code=='') this.alert('請勿空白','error');
                else{
                    this.alert('驗證中，請稍候','warn');
                    const url='https://script.google.com/macros/s/AKfycbyYJ0rWfG0aJhLLEu06BWXIDJrWAmtiAfPLv-eSvW8_TjlmWniiVb15u5sHhQo2hxYZ/exec';
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
                    })
                }
            },
            // 刷新
            getProduct(){
                const url='https://script.google.com/macros/s/AKfycbxiOOtOJpveUq87GXIOw2ZwiW0Va7zyVr00T0j_vJItlUVrTNmNYFyUxGdWGpWKRduu/exec';
                var config={
                    method:"GET",
                    redirect: 'follow'
                }
                fetch(url,config)
                .then(resp=>{
                    vm.autoLogin(); // 延遲自動登入
                    return resp.json();
                }
                )
                .then(resp=>{ 
                    this.product=resp;
                    this.allData=resp;
                    this.sort();
                })
            },
            // 刷新
            getFilter(){
                const url='https://script.google.com/macros/s/AKfycbyVUGhiW_XinYJtbGDWzAF3jbFFEyot1G7jNKX0kCl1ISmPb2gKp1FsMxVd4S2Q_8cp/exec';
                var config={
                    method:"GET",
                    redirect: 'follow'
                }
                fetch(url,config)
                .then(resp=>resp.json())
                .then(resp=>{
                    this.filterData=resp;
                })
            },
            doFilter(){
                if(this.filterName=='all') this.product=this.allData;
                else this.product=this.filterData[this.filterName]
                if(this.sortFlag==1) this.product.sort((a,b)=>b.price-a.price);
                else this.product.sort((a,b)=>a.price-b.price);
            },
            showFilter(){
                var target = document.getElementById('filterBar');
                var fil =document.getElementById('fil');
                fil.classList.toggle('showRadio')
                target.classList.toggle('showBar');
                console.log('show')
            },
            openItem(id,title,price,img,intro,mail,key){
                this.product_intro={
                    id:id,
                    title:title,
                    price:price,
                    img:img,
                    intro:intro,
                    mail:mail,
                    key:key
                }
                this.openIndex=1;
            },
            closeItem(){
                this.openIndex=0;
            },
            main(){
                this.mainPageIndex=0;
                this.closeItem();
            },
            openForum(){
                this.mainPageIndex=1;
            },
            openWindow(index){
                this.openIndex=index;
            },
            removeItem(key,title,price){
                if(confirm('確認下架商品？') && key!=undefined && key!=''){
                    this.removeEnabled=false;
                    this.alert('下架中，請稍候','warn');
                    const url='https://script.google.com/macros/s/AKfycbzFAAi_7PNm3hhE9In_m6Ga5mKF72nHEj8DqB3fynpZpADdHFMg0h_6m7oJShlyV7BaNA/exec';
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
                            this.alert('下架成功！','check');
                            this.refresh();
                        }
                        else this.alert('下架失敗','error');
                        this.removeEnabled=true;
                    })
                }
            },
            addItem(){
                if(this.uploadItem.title=='' || this.uploadItem.price=='' || this.uploadItem.intro=='' || this.uploadItem.img1=='' || this.uploadItem.img2=='' || this.uploadItem.mail=='' || this.uploadItem.tag==''){
                    this.alert('不可空白','error');
                }
                else if(!new RegExp('^[0-9]*$').test(this.uploadItem.price)){
                    this.alert('價格只能輸入數字','error');
                }
                else if(confirm('確認上架？')){
                    this.uploadEnabled=false; // 鎖定上架功能
                    this.alert('上架中，請稍候','warn');
                    const url='https://script.google.com/macros/s/AKfycbwC-md8nsJr94V3X6hO8eL-v9DvARtDhDHHdfRG9X0KxXL68WUNYX8BloY0iECAhBX8/exec';
                    var formData=new FormData();
                    formData.append('title',this.uploadItem.title);
                    formData.append('price',this.uploadItem.price);
                    formData.append('intro',this.uploadItem.intro);
                    formData.append('img1',this.uploadItem.img1);
                    formData.append('img2',this.uploadItem.img2);
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
                            this.refresh();
                            this.resetUpload();
                        }
                        else this.alert('上架失敗','error');
                        this.uploadEnabled=true; // 開啟上架功能
                    })
                }
                
            },
            reserve(title,img,price,intro,mail,key){
                if(confirm('確認預約？')){
                    this.alert('預約中，請稍候','warn');
                    const url='https://script.google.com/macros/s/AKfycbxDab6_w5CG-6DePP7ZJe8KrUxs3AR6Ce2x4A5T4jcB3oUsEKjCgVQclIKez08J1gk_/exec';
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
                            this.refresh();
                        }
                        else this.alert('預約失敗','error');
                    })
                }
            },
            // 刷新
            getOwner(){
                const url='https://script.google.com/macros/s/AKfycbwso7JZ0FHAr7XL6dts4-asR_jD8imQN3LPfumYi_AbsKAjKk_i0CI9ePwxgtAtHLV35Q/exec';
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
            },
            refresh(){
                this.getProduct();
                this.getFilter();
                this.getOwner();
                this.getForum();
                this.sort();
            },
            alert(msg,option){
                clearTimeout(this.alertTimer)
                this.alertMsgBlock=true;
                this.alertMsg=msg;
                this.alertOption=option;
                this.alertTimer = setTimeout(() => {
                    this.alertMsgBlock=false;
                }, 3250);
            },
            sort(){
                if(this.sortFlag==1) { //由低至高
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
                this.uploadItem.img2='';
                this.uploadItem.tag='';
            },
            uploadFile(option){
                this.alert('圖片上傳中，請稍候','warn');
                var item = option==1?'upload1':'upload2';
                var target =option==1?'img1':'img2'
                if(document.getElementById(item)!=null){
                    var file = document.getElementById(item).files[0];
                    var reader = new FileReader();
                    if (file) reader.readAsDataURL(file);
                    reader.addEventListener("load", () => {
                        if(file.size>5000000) this.alert('檔案大於 5MB 請重新上傳。','error');
                        else this.compressImg(reader.result,target);
                    }, false);
                
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
                    img.width=width>=680?680:width;
                    img.height=width>=680?height*(680/width):height;
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
            uploadForum(){
                if(this.forumContent=='' && this.forumContent.trim()=='') this.alert('上傳資料不可為空','error');
                else if(confirm('確認發布？')){
                    this.forumEnabled=false;
                    this.alert('發布中，請稍候','warn');
                    const url='https://script.google.com/macros/s/AKfycbxqzW2ldcPsa0s5UoVAnbTSFQBWSGN7BeCzFinDUm0JAAqPZr3tuBLGD5X1o8tg3uoEIw/exec';
                    var formData=new FormData();
                    formData.append('user',this.loginData.user);
                    formData.append('content',this.forumContent);
                    var config={
                        method:"POST",
                        body:formData,
                        redirect: 'follow'
                    }
                    fetch(url,config)
                    .then(resp=>resp.text())
                    .then(resp=>{
                        if(resp=='success'){
                            this.alert('發布成功','check');
                            this.forumContent='';
                            this.getForum();
                        }
                        else this.alert('發布失敗','error');
                        this.forumEnabled=true;
                    })
                }
            },
            getForum(){
                const url='https://script.google.com/macros/s/AKfycbxqzW2ldcPsa0s5UoVAnbTSFQBWSGN7BeCzFinDUm0JAAqPZr3tuBLGD5X1o8tg3uoEIw/exec';
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
            deleteForum(key){
                if(confirm('確認刪除留言？')){
                    this.alert('刪除留言中，請稍候','warn')
                    const url='https://script.google.com/macros/s/AKfycbwUV5fWtIq3X92X_zVvHJMjAssRLCv905NKcAAlF0ktci1IauMYw_drskuLeSX8LSwwtg/exec';
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
                    })
                }
            },
            toggleMenu(index){
                document.getElementById('menu'+index).classList.toggle('menuShow');
            }
        }
    })
    vm.alert('歡迎蒞臨本頁面','check');
    vm.getProduct();
    vm.getFilter();
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
