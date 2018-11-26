<template>
  <section class="formWrapper">
    <main>
      <div class="innerMaiin">
        <div class="h2">欢迎加入酷学院</div>
        <div class="h3">个人登记表单</div>
        <dl @click="currentItem">
          <dd class="itemList" :class="{'active':item.isActive}" v-for="(item,index) in list" :key="index"
              :index="index">
            <label>{{item.title}}<span class="del" title="删除">&times;</span></label>
            <p v-if="item.desc">{{item.desc}}</p>
            <!--单行文本选项-->
            <input v-if="item.type===1" type="text">
            <!--单项选择选项-->
            <div class="radioWrapper" v-if="item.type===2">
              <span v-for="(subItem,subIndex) in item.option" :key="subIndex"><input name="education" type="radio">{{subItem}}</span>
            </div>
            <!--下拉框选项-->
            <select v-if="item.type===3">
              <option v-for="(subItem,subIndex) in item.option" :key="subIndex" value="taiyuan">{{subItem}}</option>
            </select>
            <!--矩阵单选选项-->
            <table v-if="item.type===4" width="100%" cellspacing="0" rules="all" frame="box">
              <thead>
              <tr>
                <th></th>
                <th>较差一些</th>
                <th>一般了</th>
                <th>还不错</th>
                <th>这是我的强项</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(subItem,subIndex) in item.option" :key="subIndex">
                <td>{{subItem}}</td>
                <td>
                  <input type="radio" :name="'radio'+subIndex">
                </td>
                <td>
                  <input type="radio" :name="'radio'+subIndex">
                </td>
                <td>
                  <input type="radio" :name="'radio'+subIndex">
                </td>
                <td>
                  <input type="radio" :name="'radio'+subIndex">
                </td>
              </tr>
              </tbody>
            </table>
          </dd>
        </dl>
        <button type="submit">提交</button>
      </div>
    </main>
    <aside>
      <div class="h2">添加字段</div>
      <dl class="field-select">
        <dd @click="addList(1)">单行文本</dd>
        <dd @click="addList(4)">矩阵单选</dd>
        <dd @click="addList(2)">单项选择</dd>
        <dd @click="addList(3)">下拉框</dd>
      </dl>
      <div class="h2">编辑字段</div>
      <dl class="fieldEdit" v-if="activeInfo">
        <dd>
          <label for="title">标题</label>
          <input id="title" type="text" v-model="activeInfo.title">
        </dd>
        <dd>
          <label for="desc">标题描述</label>
          <input id="desc" type="text" v-model="activeInfo.desc">
        </dd>
        <dd v-if="activeInfo.type!==1">
          <label>
            选项
            <span class="add" title="新增" @click="addOption">&plus;</span>
          </label>
          <dl @click="delOption">
            <dd v-for="(subItem,subIndex) in activeInfo.option" :key="subIndex" :index="subIndex">
              <input type="text" v-model="activeInfo.option[subIndex]">
              <span class="del">&times;</span>
            </dd>
          </dl>
        </dd>
      </dl>
    </aside>
  </section>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'cool-college',
  data () {
    return {
      list: [
        {
          title: '留下你的大名吧',
          desc: '请告诉我们你的大名或绰号都行',
          type: 1,
          option: [],
          isActive: false
        },
        {
          title: '你来自那里呀',
          desc: '随便告诉我你的出生',
          type: 2,
          option: [
            '太原',
            '大同',
            '阳泉'
          ],
          isActive: false
        }
      ]
    }
  },
  computed: {
    activeInfo () {
      return this.list.find((item) => {
        return item.isActive === true
      })
    }
  },
  methods: {
    /**
     * @desc 获取class为className的父元素
     * @param target {{Element}} 元素
     * @param className {{String}} 父元素的class名称
     * @return target {{Element}} 获取到的父元素
     */
    getItemFromClass (target, className) {
      while (target.className.indexOf(className) === -1) {
        target = target.parentNode
      }
      return target
    },
    /**
     * @desc 通过事件委托，实现两个功能：1删除表单项; 2激活表单项（添加背景色）
     * @param e 事件对象
     * @return void
     */
    currentItem (e) {
      // 通过事件委托，获取点击表单项
      let target = this.getItemFromClass(e.target, 'itemList')

      let hasActive = target.className.indexOf('active') !== -1
      let index = target.getAttribute('index')

      // 如果点击的是删除按钮，则删除此表单项
      if (e.target.className.indexOf('del') !== -1) {
        this.list.splice(index, 1)
        return
      }
      // 如果此表单项已经是激活状态，则无需再激活
      if (hasActive) {
        return
      }
      // 如果点击的不是删除按钮且此表单项没有激活，则激活此表单项
      this.list.forEach((item) => {
        item.isActive = false
      })
      this.list[index].isActive = true
    },
    /**
     * @desc 添加表单项
     * @param type {{Number}} 1:单行文本,2:单项选择,3:下拉框,4:矩阵单选
     * @return void
     */
    addList (type) {
      this.list.forEach((item) => {
        item.isActive = false
      })
      this.list.push({
        title: '',
        desc: '',
        type: type,
        option: [],
        isActive: true
      })
    },
    delOption (e) {
      let target = e.target
      if (target.className.indexOf('del') !== -1) {
        let index = e.target.parentNode.getAttribute('index')
        this.activeInfo.option.splice(index, 1)
      }
    },
    addOption () {
      this.activeInfo.option.push('')
    }
  },
  created () {
    let a = 5
    function *gen () {
      yield 'hello'
      yield 'world'
      console.log(a)
      return 2
    }
    let mygen = gen()
    a = 6
    console.log(mygen.next())
    console.log(mygen.next())
    console.log(mygen.next())
    console.log(mygen.next())
    // function seShow () {
    //   setTimeout(function () {
    //     console.log(4)
    //   }, 1000)
    // }
    async function af () {
      await new Promise((resolve, reject) => {
        setTimeout(function () {
          console.log(4)
          resolve(true)
        }, 3000)
      })
      await new Promise((resolve, reject) => {
        setTimeout(function () {
          console.log(5)
          resolve(true)
        }, 1000)
      })
      console.log(6)
      return 9
    }

    af().then(function (res) {
      console.log(7)
      console.log(res)
    })
    console.log(10)

    function deepCopy (arr) {
      let newArr = []
      for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] === 'object') {
          newArr.push(deepCopy(arr[i]))
        } else {
          newArr.push(arr[i])
        }
      }
      return newArr
    }

    console.log(deepCopy([1, 3, [5, 6, [7, 8]]]))
  }
}
</script>
<style scoped lang="scss">
  * {
    margin: 0;
    padding: 0;
  }

  $headerColor: #518df7;
  $bigFontSize: 20px;
  $middleFontSize: 18px;
  $mallFontSize: 15px;
  .formWrapper {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    text-align: left;
    display: flex;
    font-size: $mallFontSize;
    color: #000;
    main {
      flex: 1;
      background: #f7fbfc;
      .innerMaiin {
        background: #FFF;
        width: 80%;
        margin: 20px auto;
        border-radius: 5px;
        .h2 {
          color: #FFF;
          background: $headerColor;
          line-height: 48px;
          padding: 0 20px;
          font-size: $bigFontSize;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }
        .h3 {
          line-height: 66px;
          font-size: $bigFontSize;
          padding: 0 20px;
        }
        dl {
          dd {
            padding: 20px;
            // 表单项激活状态下背景色不同
            &.active {
              background: #dfeafd;
            }
            label {
              margin-bottom: 10px;
              font-size: $middleFontSize;
              display: block;
              .del {
                float: right;
                font-size: 30px;
                cursor: pointer;
              }
            }
            p {
              margin-bottom: 10px;
              color: #666;
              font-size: $mallFontSize;
            }
            input {
              font-size: 18px;
            }
            input[type='text'], select {
              width: 284px;
              height: 38px;
              border: 1px solid #cccccc;
              border-radius: 4px;
              font-size: 18px;
              padding-left: 10px;
            }
            .radioWrapper {
              span {
                margin-left: 26px;
                &:nth-of-type(1) {
                  margin-left: 0;
                }
                input {
                  margin-right: 5px;
                }
              }
            }
            input[type='radio'] {
              display: inline-block;
              width: 18px;
              height: 18px;
              vertical-align: middle;

            }
            table {
              text-align: center;
              td, th {
                border: 1px solid #cccccc;
                line-height: 40px;
                &:first-child {
                  min-width: 30px;
                }
              }
              th {
                background: #eeeeee;
              }
            }
          }
        }
        button {
          width: 170px;
          height: 40px;
          color: #fff;
          background: $headerColor;
          outline: none;
          border: none;
          border-radius: 5px;
          margin-left: 20px;
          margin-top: 10px;
          margin-bottom: 10px;
          cursor: pointer;
        }
      }
    }
    aside {
      flex: 0 0 320px;
      background: #FFF;
      box-sizing: border-box;
      .h2 {
        line-height: 35px;
        color: #FFF;
        background: $headerColor;
        padding-left: 12px;
        font-size: 16px;
      }
      .field-select {
        display: flex;
        flex-wrap: wrap;
        padding: 26px 12px;
        text-align: center;
        justify-content: space-around;
        dd {
          box-shadow: 0 0 3px #d5d5d5;
          flex: 0 0 133px;
          height: 34px;
          line-height: 34px;
          margin-bottom: 14px;
          cursor: pointer;
          &:nth-child(n+3) {
            margin-bottom: 0;
          }
        }
      }
      .fieldEdit {
        padding: 0 12px;
        box-sizing: border-box;
        > dd {
          margin-top: 14px;
          margin-bottom: 24px;
          label {
            margin-bottom: 10px;
            font-size: $middleFontSize;
            display: block;
            .add {
              font-size: 30px;
              line-height: 30px;
              cursor: pointer;
              float: right;
            }
          }
          input {
            width: 100%;
            box-sizing: border-box;
            height: 28px;
            border: 1px solid #cccccc;
            border-radius: 4px;
            padding-left: 10px;
          }
          dl {
            margin-top: 20px;
            overflow: hidden;
            dd {
              display: flex;
              margin-bottom: 12px;
              text-align: center;
              input {
                flex: 1;
              }
              span {
                flex: 0 0 30px;
                font-size: 30px;
                line-height: 30px;
                text-align: right;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
</style>
