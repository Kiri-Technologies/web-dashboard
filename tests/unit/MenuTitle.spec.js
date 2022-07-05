import { mount } from "@vue/test-utils";
import MenuTitle from "@/components/atoms/menuTitle/MenuTitle.vue";

// Check nampilin label
describe("MenuTitle.vue", () => {
  it("renders menu title component", async () => {
    const props = {
      path: { path: '/' },
      heading: "Akun",
      subHeading: "Melihat akun anda",
    };

    const wrapper = mount(MenuTitle, {
      props,
      global: {
        stubs: {
          "router-link": {
            template: "<a />",
          },
          "font-awesome-icon": {
            template: "<span />",
          },
        },
      },
    });

    expect(wrapper.html()).toContain("Akun");
    expect(wrapper.html()).toContain("Melihat akun anda");
  });
});