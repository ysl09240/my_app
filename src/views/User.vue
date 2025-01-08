<template>
  <div class="manage">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
      <el-form
        :inline="true"
        :model="userForm"
        :rules="rules"
        ref="userForm"
        label-width="100px"
        class="userForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model.number="userForm.age"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input placeholder="请输入手机号码" v-model.number="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="userForm.sex" placeholder="请选择">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker v-model="userForm.birth" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="userForm.addr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="dialogVisible = true">+ 新增</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      userForm: {
        name: "",
        age: "",
        phone: "",
        sex: "",
        birth: "",
        addr: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          { type: "number", message: "年龄必须为数字值" }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { type: "number", message: "手机必须为数字值" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        birth: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        addr: [{ required: true, message: "请输入地址", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleClose() {
      this.$refs.userForm.resetFields();
      this.dialogVisible = false;
    },
    submit(){
      this.$refs.userForm.validate((valid) => {
          if (valid) {
            alert('submit!');
            this.handleClose();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    cancel(){
      this.handleClose();
    }
  }
};
</script>

