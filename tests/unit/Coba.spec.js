import { mount } from "@vue/test-utils";
import Coba from "@/Coba.vue";

describe("Coba.vue", () => {
  it("check class from coba component", () => {
    const wrapper = mount(Coba);

    expect(wrapper.classes()).toContain('bg-red-500')
  });
});
