import { mount } from "@vue/test-utils";
import BaseAlert from "@/components/atoms/alert/BaseAlert.vue";

describe("BaseAlert.vue", () => {
  it("renders alert success with props.message when passed", () => {
    const props = {
      message: "Berhasil mengubah data",
      mode: "success",
    };
    const wrapper = mount(BaseAlert, {
      props,
    });

    expect(wrapper.text()).toContain(props.message);
    expect(wrapper.classes()).toContain("alert-success");
    // expect(wrapper.classes()).toContain('alert')
  });

  it("renders alert error with props.message when passed", () => {
    const props = {
      message: "Gagal mengubah data",
      mode: "error",
    };
    const wrapper = mount(BaseAlert, {
      props,
    });

    expect(wrapper.text()).toContain(props.message);
    expect(wrapper.classes()).toContain("alert-error");
    // expect(wrapper.classes()).toContain('alert')
  });
});
