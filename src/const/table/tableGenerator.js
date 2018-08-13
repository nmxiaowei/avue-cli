import {
    DIC
} from '@/const/dic'
const columnList = {
    label: {
        label: "列名称",
        prop: "label",
        rules: [{
            required: true,
            message: "请输入列名称",
            trigger: "blur"
        }]
    },
    prop: {
        label: "prop字段",
        prop: "prop",
        rules: [{
            required: true,
            message: "请输入prop字段",
            trigger: "blur"
        }]
    },
    type: {
        label: "表单类型",
        prop: "type",
        type: "tree",
        dicData: DIC.CRUDTYPE
    },
    row: {
        label: "单独一行",
        prop: "row",
        type: "select",
        dicData: DIC.VAILDATA
    },
    placeholder: {
        label: "自定义提示语",
        prop: 'placeholder',
    },
    valueDefault: {
        label: "默认值",
        prop: "valueDefault",
        hide: true
    },
    width: {
        label: "列宽度",
        prop: "width",
        hide: true
    },
    fixed: {
        label: "冻结列",
        prop: "fixed",
        hide: true,
        type: "select",
        dicData: DIC.VAILDATA,
    },
    hide: {
        label: "隐藏列",
        prop: "hide",
        hide: true,
        type: "select",
        dicData: DIC.VAILDATA,
    },
    span: {
        label: "表单栅列",
        prop: "span",
        hide: true
    },
    addDisabled: {
        label: "新增表单禁止",
        prop: "addDisabled",
        hide: true,
        type: "select",
        dicData: DIC.VAILDATA,
    },
    editDisabled: {
        label: "表单编辑禁止",
        prop: "editDisabled",
        hide: true,
        type: "select",
        dicData: DIC.VAILDATA,
    },
    clearable: {
        label: "表单可清空",
        prop: "clearable",
        hide: true,
        type: "select",
        dicData: DIC.VAILDATA,
    },
    addVisdiplay: {
        label: "表单新增隐藏",
        prop: "addVisdiplay",
        hide: true,
        type: "select",
        dicData: DIC.VAILDATA,
    },
    editVisdiplay: {
        label: "表单编辑隐藏",
        prop: "editVisdiplay",
        hide: true,
        type: "select",
        dicData: DIC.VAILDATA,
    },
    formsolt: {
        label: "表单自定义",
        prop: "formsolt",
        hide: true,
        type: "select",
        dicData: DIC.VAILDATA,
    },
    solt: {
        label: "列自定义",
        prop: "solt",
        hide: true,
        type: "select",
        dicData: DIC.VAILDATA,
    },
    overHidden: {
        label: "超省略号",
        prop: "overHidden",
        hide: true,
        type: "select",
        dicData: DIC.VAILDATA,
    },
    dicData: {
        label: "字典",
        prop: "dicData",
        row: true,
        span: 24,
        formsolt: true,
    },
    search: {
        label: "搜索",
        prop: "select",
        type: "select",
        dicData: DIC.VAILDATA,
    },
    multiple: {
        label: "是否多选",
        prop: "multiple",
        type: "select",
        dicData: DIC.VAILDATA,
    },
    minRows: {
        label: "最小行",
        prop: "minRows",
        type: "number",
    },
    disabled: {
        label: "禁止",
        prop: "disabled",
        type: "select",
        dicData: DIC.VAILDATA,
    },
    maxRows: {
        label: "最大行",
        prop: "maxRows",
        type: "number",
    },
    default: {
        labelWidth: 0,
        prop: "default",
        span: 24,
        row: true,
        formsolt: true,
    }
}
const typeList = {
    common: ['label', 'prop', 'type', 'valueDefault', 'width', 'fixed', 'hide', 'span', 'addDisabled', 'editDisabled', 'clearable', 'addVisdiplay', 'editVisdiplay', 'formsolt', 'solt', 'overHidden', 'search', 'multiple', 'minRows', 'maxRows'],
    builder: ['label', 'prop', 'row', 'span', 'placeholder', 'type', 'valueDefault', 'disabled', 'hide', 'clearable', 'default'],
    default: [],
}
export const getList = (type) => {
    type = type || 'common';
    const column = [];
    typeList[type].forEach(ele => {
        column.push(columnList[ele])
    });
    return column;
}
export default function(type) {
    return {
        page: false,
        border: true,
        index: true,
        height: 300,
        align: 'center',
        labelWidth: 100,
        menuAlign: 'center',
        dicData: DIC,
        column: getList(type),
    }
}