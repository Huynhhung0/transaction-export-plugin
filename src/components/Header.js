module.exports = {
  template: `
    <div class="flex w-full items-center mb-3 py-8 px-10 rounded-lg bg-theme-feature">
      <div class="flex items-center">
        <WalletIdenticon
          :value="address"
          :size="50"
          class="flex-inline mr-4"
        />

        <div class="flex flex-col pr-12">
          <span class="text-sm text-theme-page-text-light font-semibold mb-1">
            Address
          </span>

          <MenuDropdown
            ref="address"
            :items="addresses"
            :value="address"
            :pin-to-input-width="true"
            @select="emitAddressChange"
          />
        </div>
      </div>

      <div
        v-if="!isLoading && hasRecords"
        class="flex flex-col border-l border-theme-line-separator px-12"
      >
        <span class="text-sm text-theme-page-text-light font-semibold mb-1">
          Period
        </span>

        <MenuDropdown
          ref="period"
          :disabled="isLoading"
          :items="availablePeriods"
          :value="period"
          container-classes="whitespace-no-wrap"
          @select="emitPeriodChange"
        />
      </div>

      <div class="flex items-center ml-auto">
        <button
          :disabled="isLoading"
          class="ContactAll__CreateButton justify-end mr-4"
          @click="emitReload"
        >
          <span class="ContactAll__CreateButton__icon">
            <SvgIcon
              name="reload"
              view-box="0 0 15 14"
              class="text-center"
            />
          </span>

          <span class="flex items-center h-10 px-4 whitespace-no-wrap">
            Reload
          </span>
        </button>

        <button
          :disabled="isLoading || !hasRecords"
          class="ContactAll__CreateButton justify-end"
          @click="emitOpenExportModal"
        >
          <span class="ContactAll__CreateButton__icon">
            <SvgIcon
              name="arrow-export"
              view-box="0 0 7 10"
              class="text-center"
            />
          </span>

          <span class="flex items-center h-10 px-4 whitespace-no-wrap">
            Export
          </span>
        </button>
      </div>
    </div>
  `,

  props: {
    address: {
      type: String,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    },
    hasRecords: {
      type: Number,
      required: true
    },
    period: {
      type: String,
      required: true
    },
    availablePeriods: {
      type: Object,
      required: true
    },
    callback: {
      type: Function,
      required: true
    }
  },

  computed: {
    profile () {
      return walletApi.profiles.getCurrent()
    },

    addresses () {
      return this.profile.wallets.map(wallet => wallet.address)
    }
  },

  methods: {
    executeCallback (event, options) {
      this.callback({
        component: 'Header',
        event,
        options
      })
    },

    emitAddressChange (address) {
      this.executeCallback('addressChange', { address })
    },

    emitPeriodChange (period) {
      this.executeCallback('periodChange', { period })
    },

    emitOpenExportModal () {
      this.executeCallback('openExportModal')
    },

    emitReload () {
      this.executeCallback('reload')
    }
  }
}