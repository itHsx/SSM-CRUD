$(function () {

    // 获取web的根路径
    var webPath = $('#webPath').val();

    //总记录数
    var total;

    //抽取出来的当前页码
    var pageNum;

    var imgPath = webPath + 'static/images/blue-snow.png';
    $(document.body).css("background", "url(" + imgPath + ") no-repeat fixed center");
    $(document.body).css("background-size", "cover");

    /*-----------------------------------------------------------------------------------------------*/

    //页面加载完成后发送ajax请求查询第一页
    ajax(1);

    //抽取ajax
    function ajax(pageNumber) {

        // 发送 ajax 获取员工信息
        $.ajax({
            url: webPath + "/employee",
            data: {"pageNumber": pageNumber}, //传入需要查询的页面
            type: "GET",
            success: function (result) {
                //解析并显示员工数据
                build_emps_table(result);
                //解析并显示分页信息
                build_page_info(result);
                //解析并显示分页条
                build_page_nav(result);
            }
        });
    }

    //解析并显示员工数据方法
    function build_emps_table(result) {

        //做什么操作之前先清空表格
        $("#emp_table tbody").empty();

        //获取ajax请求获取的数据result
        var emps = result.extend.pageInfo.list;
        //遍历 result.extend.pageInfo.list
        $.each(emps, function (index, item) {

            //创建checkBox
            var checkBoxTd = $("<td><input type='checkbox' class='check_item'/></td>")

            var emp_id = $('<td></td>').append(item.empId);
            var name = $('<td></td>').append(item.empName);
            var gender = $('<td></td>').append(item.gender == 'M' ? '男' : '女');
            var email = $('<td></td>').append(item.email);
            var department = $('<td></td>').append(item.department.deptName)

            var editBtn = $("<button></button>").addClass("btn btn-primary btn-sm edit_btn")
                .append($("<span></span>").addClass("glyphicon glyphicon-pencil").append("编辑"))
            //为编辑按钮添加一个自定义的属性 ：表示当前员工的id
            editBtn.attr("edit_id", item.empId)

            var delBtn = $("<button></button>").addClass("btn btn-danger btn-sm delete_btn")
                .append($("<span></span>").addClass("glyphicon glyphicon-trash").append("删除"))
            //为删除按钮添加一个自定义的属性 ：表示当前员工的id
            delBtn.attr("del_id", item.empId)

            var btnTd = $('<td></td>').append(editBtn).append(" ").append(delBtn)
            $('<tr></tr>').append(checkBoxTd).append(emp_id).append(name).append(gender).append(email)
                .append(department).append(btnTd)
                .appendTo('#emp_table tbody');
        });
    };

    //解析并显示分页信息方法
    function build_page_info(result) {

        //做什么操作之前先清空表格
        $("#page_info_area").empty();

        $("#page_info_area").append(`当前${result.extend.pageInfo.pageNum}页,
        总${result.extend.pageInfo.pages}页,
        总${result.extend.pageInfo.total}条记录`)

        //抽取当前页码
        pageNum = `${result.extend.pageInfo.pageNum}`

        //抽取总记录数
        total = `${result.extend.pageInfo.total}`

    };

    //解析并显示分页条方法
    function build_page_nav(result) {

        //做什么操作之前先清空表格
        $("#NavigationBar").empty();

        // ul
        var nav_ul = $('<ul class="pagination pagination-lg"></ul>').appendTo($('<nav></nav>'));

        // 首页
        var firstPage = $('<li></li>').append($('<a href="#">首页</a>'));
        //为首页绑定单击事件
        firstPage.click(function () {
            ajax(1)
        })

        // 上一页
        var prePage = $('<li></li>').append($('<a href="#" aria-label="Previous"></a>')
            .append($('<span aria-hidden="true">&laquo;</span>')));
        //为上一页绑定单击事件
        prePage.click(function () {
            ajax(result.extend.pageInfo.pageNum - 1)
        })
        //如果没有上一页，则不让点
        if (result.extend.pageInfo.hasPreviousPage == false) {
            firstPage.addClass("disabled");
            prePage.addClass("disabled");
        } else { //没有上一页就不添加首页和上一页了
            // 把首页和上一页添加进ul
            nav_ul.append(firstPage).append(prePage)
        }

        // 遍历显示导航条
        $.each(result.extend.pageInfo.navigatepageNums, function (index, item) {
            var numLi = $('<li></li>').append($(`<a href="#">${item}</a>`));
            //添加点击事件 点至之后发送ajax请求 前往对应的页数
            numLi.click(function () {
                ajax(item)
            })
            //如果是当前页面就高亮
            if (result.extend.pageInfo.pageNum == item) {
                numLi.addClass("active");
            }
            //把每一个导航条添加进ul
            nav_ul.append(numLi)
        });

        // 下一页
        var nextPage = $('<li></li>').append($('<a href="#" aria-label="Next"></a>')
            .append($('<span aria-hidden="true">&raquo;</span>')));
        //为下一页绑定单击事件
        nextPage.click(function () {
            ajax(result.extend.pageInfo.pageNum + 1)
        })

        // 末页
        var lastPage = $('<li></li>').append($('<a href="#">末页</a>'));
        //为末页绑定单击事件
        lastPage.click(function () {
            ajax(result.extend.pageInfo.pages)
        })
        //如果没有下一页，则不让点
        if (result.extend.pageInfo.nextPage == false) {
            nextPage.addClass("disabled");
            lastPage.addClass("disabled");
        } else {  //没有下一页就不添加下一页和未页了
            // 把下一页和末页添加进ul
            nav_ul.append(nextPage).append(lastPage)
        }

        // 把整个导航条添加到div
        $("#NavigationBar").append(nav_ul)
    };

    /*-----------------------------------------------------------------------------------------------*/
    //新增按钮

    //Ajax请求 查出所有的部门信息显示
    function getDepts(ele) {

        //每次发送请求先清空列表框
        $(ele).empty()

        $.ajax({
            url: webPath + "/department",
            type: "GET",
            success: function (result) {
                //显示部门信息在下拉列表框
                showSelect_deptName(result, ele);
            }
        })
    }

    //显示部门信息在下拉列表框
    function showSelect_deptName(result, ele) {
        $.each(result.extend.departments, function (index, department) {
            var optionELe = $(`<option>${department.deptName}</option>`)
                .attr("value", department.deptId).appendTo(ele)
        })
    }

    //为新增按钮绑定事件
    $("#emp_add_model_btn").click(function () {

        //发送ajax请求，查出部门信息 显示在下拉列表中
        getDepts("#select_deptName")

        //打开模态框
        $("#empAddModel").modal({
            backdrop: "static"
        });
    })

    //校验表单数据
    function check_add_form(ele1, ele2) {
        var empName = $(ele1).val();
        var regName = /(^[a-zA-Z0-9_-]{6,16}$)|(^[\u2E80-\u9FFF]{2,5})/;
        var empEmail = $(ele2).val();
        var regEmail = /^([a-zA_Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        //检验姓名
        if (!regName.test(empName)) {
            show_validate_msg(ele1, "error", "用户名为 6-16 位英文字符或 2-6 位汉字！");
        } else {
            show_validate_msg(ele1, "success", "");
        }
        // 检验邮箱
        if (!regEmail.test(empEmail)) {
            show_validate_msg(ele2, "error", "邮箱格式错误！");
        } else {
            show_validate_msg(ele2, "success", "");
        }
        // 返回检验状态
        return regName.test(empName) && regEmail.test(empEmail);
    }

    //展示校验验证员工信息
    function show_validate_msg(ele, status, msg) {
        // 清除当前元素的检验状态
        $(ele).parent().removeClass("has-success has-error");
        // 检验成功
        if ("success" == status) {
            $(ele).parent().addClass("has-success");
            $(ele + "_errorMsg").text(msg);
        } else if ("error" == status) {  //检验失败
            $(ele).parent().addClass("has-error");
            $(ele + "_errorMsg").text(msg);
        }
    }

    //为模态框的保存按钮绑定单击事件
    $("#emp_save_btn").click(function () {

        //获取表单提交的数据
        var employee = $("#save_emp_form").serialize();

        //保存前 校验表单数据
        var flag = check_add_form("#empName_add_input", "#email_add_input"); //调用校验方法
        if (flag) {
            //校验成功后 在数据保存进服务器前 发送ajax进行邮箱是否重复验证
            $.ajax({
                url: webPath + "/checkEmail",
                type: "GET",
                data: {"email": $("#email_add_input").val()},
                success: function (result) {
                    //判断证返回的信息是100(成功)还是别的(失败)
                    if (result.code == "100") {
                        //不重复就将数据添加进数据库
                        //不重复就将提示信息去除
                        $("#email_add_input_errorMsg").text("")
                        //把数据提交到服务器进行保存 -->后端校验
                        $.ajax({
                            url: webPath + "/employee",
                            type: "post",
                            data: employee,
                            success: function (result) {
                                //后端校验成功则保存
                                if (result.code = "100") {
                                    //员工保存成功后 关闭模态框
                                    $("#empAddModel").modal("hide");
                                    //模态框关闭后清空表单样式
                                    $("#email_add_input").parent().removeClass("has-success has-error");
                                    $("#empName_add_input").parent().removeClass("has-success has-error");
                                    //模态框关闭后清空表单内容
                                    $("#empName_add_input").val("");
                                    $("#email_add_input").val("");
                                    //来到最后一页 显示刚才保存的数据
                                    //因为数据合理化 所以传入比总页码大的数会自动跳回最后一页 抽取总记录数
                                    ajax(total);
                                } else { //后端校验失败
                                    alert("非法输入!!!")
                                    //console.log(result) //后端校验失败返回的信息
                                }
                            }
                        })
                    } else {
                        //邮箱重复清空邮箱内容
                        $("#email_add_input").val("");
                        //如果邮箱重复就给出提示信息
                        $("#email_add_input").parent().addClass("has-error");
                        $("#email_add_input_errorMsg").text("邮箱重复")
                    }
                }
            })
        }
    })

    /*-----------------------------------------------------------------------------------------------*/
    //编辑按钮的单击事件 ->普通方法绑不上 因为页面的所有东西都是通过ajax请求后来创建或者获取的
    $(document).on("click", ".edit_btn", function () {

        //调用ajax请求方法，查出部门信息 显示在下拉列表中
        getDepts("#select_update_deptName")

        //$(this).attr("edit_id") 被点击按钮的edit_id属性的值（创建按钮的时候有设置）
        var empId = $(this).attr("edit_id")
        //调用发送ajax请求根据id查询员工数据的方法
        getEmp(empId);

        //把员工的empId传递给模态框里的的修改按钮
        $("#emp_update_btn").attr("edit_id", empId)

        //打开模态框
        $("#empUpdateModel").modal({
            backdrop: "static"
        });

    })

    //ajax请求查询员工信息
    function getEmp(empId) {
        $.ajax({
            url: webPath + `/employee/${empId}`,
            type: "GET",
            success: function (result) {
                //调用方法显示数据
                show_update_EmpData(result);
            }
        })
    }

    //把根据id查询到的员工数据显示在用于修改的模态框
    function show_update_EmpData(result) {
        //获取客户端返回的员工对象
        var employee = result.extend.employee;
        /*显示数据*/
        $("#empName_update_static").val(employee.empName)
        $("#email_update_input").val(employee.email)

        //取出gender的值
        var gender = employee.gender;
        if ('M' == gender) { //#gender1_update_input 男 ; #gender2_update_input 女
            $("#gender2_update_input").attr("checked", false)
            $("#gender1_update_input").attr("checked", true)
        } else {
            $("#gender1_update_input").attr("checked", false)
            $("#gender2_update_input").attr("checked", true)
        }

        $("#select_update_deptName").val(employee.dId)
    }

    //为更新按钮绑定更新事件
    $("#emp_update_btn").click(function () {
        //修改前 校验表单数据
        var flag = check_add_form("#empName_update_static", "#email_update_input"); //调用校验方法
        if (flag) {
            //前台校验成功后 在数据保存进服务器前 发送ajax进行邮箱是否重复验证
            $.ajax({
                url: webPath + "/checkEmail",  //-->后端校验
                type: "GET",
                data: {"email": $("#email_update_input").val()},
                success: function (result) {
                    //判断证返回的信息是100(成功)还是别的(失败)
                    if (result.code == "100") {
                        //不重复就将数据添加进数据库
                        //不重复就将提示信息去除
                        $("#email_add_input_errorMsg").text("")
                        /*把数据提交到服务器进行修改*/
                        //获取当前修改按钮上的empId
                        var empId = $("#emp_update_btn").attr("edit_id")
                        $.ajax({
                            url: webPath + `/employee/${empId}`,
                            type: "PUT",
                            data: $('#update_emp_form').serialize(),
                            success: function (result) {
                                //后端校验成功则保存
                                if (result.code = "100") {
                                    //员工保存成功后 关闭模态框
                                    $("#empUpdateModel").modal("hide");
                                    //模态框关闭后清空表单样式
                                    $("#email_update_input").parent().removeClass("has-success has-error");
                                    $("#empName_update_static").parent().removeClass("has-success has-error");
                                    //模态框关闭后清空表单内容
                                    $("#empName_update_static").val("");
                                    $("#email_update_input").val("");
                                    //重新查询数据回到本页面
                                    ajax(pageNum);
                                } else { //后端校验失败
                                    alert("非法输入!!!")
                                    //console.log(result) //后端校验失败返回的信息
                                }
                            }
                        })
                    } else {
                        //邮箱重复清空邮箱内容
                        $("#email_update_input").val("");
                        //如果邮箱重复就给出提示信息
                        $("#email_update_input").parent().addClass("has-error");
                        $("#email_update_input_errorMsg").text("邮箱重复")
                    }
                }
            })
        }
    })

    /*-----------------------------------------------------------------------------------------------*/
    //checkBox的全选全不选
    $("#check_all").click(function () {
        //将所有.check_item(checkBox)的checked属性设置为与当前被点击的checkBox一样
        //dom原生的属性需要用prop来获取
        $(".check_item").prop("checked", $(this).prop("checked"))
    })

    //实现.check_item被全点上之后 check_all 也要成为选中状态
    $(document).on("click", ".check_item", function () {
        //判断当前选中的元素是否是7个 :$(".check_item:checked")-->匹配所有被选中的复选框
        //$(".check_item").length-->拥有.check_item的类的checkBox的个数
        if ($(".check_item:checked").length == $(".check_item").length) {
            $("#check_all").prop("checked", true);
        } else {
            $("#check_all").prop("checked", false)
        }
    })
    /*-----------------------------------------------------------------------------------------------*/

    //为删除按钮绑定单击事件 -->单个删除
    $(document).on("click", ".delete_btn", function () {
        //员工姓名
        var empName = $(this).parents("tr").find("td:eq(1)").text();

        //取出员工的id
        var empIds = $(this).attr("del_id")

        if (confirm(`确认删除:${empName}吗`)) {
            //确认删除发送Ajax请求
            $.ajax({
                url: webPath + `/employee/${empIds}`,
                type: "DELETE",
                success: function (result) {
                    //重新查询数据回到本页面
                    ajax(pageNum);
                }
            })
        }
    })

    //点击删除选中 就批量删除
    $("#emp_del_model_btn").click(function () {
        var empIds = "";
        $.each($(".check_item:checked"), function (index, item) {
            // 组装员工 id 字符串
            empIds += $(this).parents("tr").find("td:eq(1)").text() + "-";
        });
        empIds = empIds.substring(0, empIds.length - 1); //去除在最后多余的-
        if (confirm(`确认删除吗`)) {
            //确认删除发送Ajax请求
            $.ajax({
                url: webPath + `/employee/${empIds}`,
                type: "DELETE",
                success: function (result) {
                    //重新查询数据回到本页面
                    ajax(pageNum);
                }
            })
        }
    })

});
