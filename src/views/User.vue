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
            <el-option label="男" :value="0"></el-option>
            <el-option label="女" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="userForm.birth"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-DD"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="userForm.addr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="handleAdd">+新增</el-button>
      <el-form :inline="true" :model="userSearchForm">
        <el-form-item>
          <el-input placeholder="请输入名称" v-model="userSearchForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchSubmit()">查 询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="manage-table">
      <el-table :data="tableData" size="small" style="width: 100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sex ===0?'男':'女' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="birth" label="出生日期"></el-table-column>
        <el-table-column prop="phone" label="手机号码"></el-table-column>
        <el-table-column prop="addr" label="地址"></el-table-column>
        <el-table-column prop="addr" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getUser, addUser, editUser, delUser } from "../api";
export default {
  data() {
    return {
      pageData: {
        page: 1,
        limit: 10
      },
      total: 0,
      tableData: [],
      dialogVisible: false,
      modelType: 0,
      userSearchForm: {
        name: ""
      },
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
    submit() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          if (this.modelType == 0) {
            addUser(this.userForm).then(({ data }) => {
              this.getUserList();
            });
          } else {
            editUser(this.userForm).then(({ data }) => {
              this.getUserList();
            });
          }
          this.handleClose();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel() {
      this.handleClose();
    },
    handleEdit(row) {
      this.dialogVisible = true;
      this.modelType = 1;
      this.userForm = JSON.parse(JSON.stringify(row));
    },
    handleDelete(row) {
      delUser(row).then(({ data }) => {
        this.getUserList();
      });
    },
    handleAdd() {
      this.dialogVisible = true;
      this.modelType = 0;
    },
    getUserList() {
      getUser({ params: {...this.pageData,...this.userSearchForm} }).then(({ data }) => {
        console.log(data, "getUser");
        this.tableData = data.list;
        this.total = data.count;
      });
    },
    handleCurrentChange(val) {
      this.pageData.page = val;
      this.getUserList();
    },
    searchSubmit(){
      this.getUserList();
    }
  },
  mounted() {
    this.getUserList();
  }
};
</script>
<style lang="less" scoped>
.manage {
  height: 90%;
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .manage-table {
    position: relative;
    height: calc(100%-62px);
    .pager {
      position: absolute;
      right: 20px;
    }
  }
}
</style>


