import { mount } from "@vue/test-utils";
import BaseBreadCrumb from "@/components/atoms/breadcrumb/BaseBreadCrumb.vue";

describe("BreadCrumb.vue", () => {
  it("renders breadcrumb based on array given", () => {
    const props = {
      crumbs: [
        {
          title: "Akun",
          link: {
            path: "/manageaccount",
          },
        },
        {
          title: "Tambah Akun",
          link: {
            path: "/manageaccount/create",
          },
        },
      ],
    };
    const wrapper = mount(BaseBreadCrumb, {
      props,
      global: {
        stubs: {
          "router-link": {
            template: "<a />",
          },
        },
      },
    });

    expect(wrapper.find('a').exists()).toBe(true);
    expect(wrapper.find('li').exists()).toBe(true);
  });
});
