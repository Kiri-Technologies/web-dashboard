import { mount } from "@vue/test-utils";
import DeleteModal from "@/components/atoms/modal/DeleteModal.vue";
import SaveModal from "@/components/atoms/modal/SaveModal.vue";

describe("DeleteModal.vue", () => {
  // check render
  it("renders delete modal component", async () => {
    const props = {
      id: 1,
    };

    const wrapper = mount(DeleteModal, {
      props,
      slots: {
        default: "hapus",
        title: "Hapus Akun?",
        body: "Anda yakin untuk menghapus Akun yang dipilih?",
      },
    });

    expect(wrapper.html()).toContain("hapus");
    expect(wrapper.html()).toContain("Hapus Akun?");
    expect(wrapper.html()).toContain(
      "Anda yakin untuk menghapus Akun yang dipilih?"
    );
  });

  // check does the modal component visible when user click the button
  it("check does the modal component visible when user click the button", async () => {
    const props = {
      id: 1,
    };

    const wrapper = mount(DeleteModal, {
      props,
      slots: {
        default: "hapus",
        title: "Hapus Akun?",
        body: "Anda yakin untuk menghapus Akun yang dipilih?",
      },
    });

    const button = wrapper.find(`a[href*="delete-modal-${props.id}"]`);
    const modal = wrapper.find(`#delete-modal-${props.id}`);

    // expect(modal.isVisible()).toBe(false);

    await button.trigger("click");

    expect(modal.isVisible()).toBe(true);
  });

  // Check emit
  it("check does the component emits after click the delete button", async () => {
    const props = {
      id: 1,
    };

    const wrapper = mount(DeleteModal, {
      props,
      slots: {
        default: "hapus",
        title: "Hapus Akun?",
        body: "Anda yakin untuk menghapus Akun yang dipilih?",
      },
    });

    const button = wrapper.find(`#delete-button-${props.id}`);

    await button.trigger("click");

    expect(wrapper.emitted()).toHaveProperty("deleteButtonClicked");

    const deleteButtonClickedEvent = wrapper.emitted("deleteButtonClicked");

    expect(deleteButtonClickedEvent[0]).toEqual([1]);
  });
});

describe("SaveModal.vue", () => {
  // check render
  it("renders save modal component", async () => {
    const props = {
      id: 1,
    };

    const wrapper = mount(SaveModal, {
      props,
      slots: {
        default: "Simpan",
        title: "Simpan perubahan?",
        body: "Anda yakin untuk menyimpan perubahan?",
      },
    });

    expect(wrapper.html()).toContain("Simpan");
    expect(wrapper.html()).toContain("Simpan perubahan?");
    expect(wrapper.html()).toContain("Anda yakin untuk menyimpan perubahan?");
  });

  // check does the modal component visible when user click the button
  it("check does the modal component visible when user click the button", async () => {
    const props = {
      id: 1,
    };

    const wrapper = mount(SaveModal, {
      props,
      slots: {
        default: "Simpan",
        title: "Simpan perubahan?",
        body: "Anda yakin untuk menyimpan perubahan?",
      },
    });

    const button = wrapper.find(`a[href*="save-modal-${props.id}"]`);
    const modal = wrapper.find(`#save-modal-${props.id}`);

    // expect(modal.isVisible()).toBe(false);

    await button.trigger("click");

    expect(modal.isVisible()).toBe(true);
  });

  // Check emit
  it("check does the component emits after click the delete button", async () => {
    const props = {
      id: 1,
    };

    const wrapper = mount(SaveModal, {
      props,
      slots: {
        default: "Simpan",
        title: "Simpan perubahan?",
        body: "Anda yakin untuk menyimpan perubahan?",
      },
    });

    const button = wrapper.find(`#save-button-${props.id}`);

    await button.trigger("click");

    expect(wrapper.emitted()).toHaveProperty("saveButtonClicked");

    const saveButtonClickedEvent = wrapper.emitted("saveButtonClicked");

    expect(saveButtonClickedEvent[0]).toEqual([1]);
  });
});
