/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import { Platform } from 'react-native';
import RNSimpleOpenvpn, { addVpnStateListener, removeVpnStateListener } from 'react-native-simple-openvpn';

const isIPhone = Platform.OS === 'ios';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(():any => {
    async function observeVpn() {
      if (isIPhone) {
        await RNSimpleOpenvpn.observeState();
      }

      addVpnStateListener((e) => {
        // ...
        console.log(e);
        printVpnState();
      });
    }

    observeVpn();
    startOvpn();
    return async () => {
      if (isIPhone) {
        await RNSimpleOpenvpn.stopObserveState();
      }

      removeVpnStateListener();
    };

  });
  var vpnfile:string = `client
proto udp
explicit-exit-notify
remote 124.222.66.174 1194
dev tun
resolv-retry infinite
nobind
persist-key
persist-tun
remote-cert-tls server
verify-x509-name server_Nux24lZ3N4pQNBPh name
auth SHA256
auth-nocache
cipher AES-128-GCM
tls-client
tls-version-min 1.2
tls-cipher TLS-ECDHE-ECDSA-WITH-AES-128-GCM-SHA256
ignore-unknown-option block-outside-dns
setenv opt block-outside-dns # Prevent Windows 10 DNS leak
verb 3
<ca>
-----BEGIN CERTIFICATE-----
MIIB1zCCAX2gAwIBAgIUSt+JLH1cm8xkYniQiZZsT51zVBMwCgYIKoZIzj0EAwIw
HjEcMBoGA1UEAwwTY25fczcySklieldObHZ6UGdMWjAeFw0yNDEwMjgwNjU3MTla
Fw0zNDEwMjYwNjU3MTlaMB4xHDAaBgNVBAMME2NuX3M3MkpJYnpXTmx2elBnTFow
WTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAARrvXRz2KvnkT1cws4xqXC3rl0Y+8Pt
8pX++2L/vFKvLxaAjPQOvoPvqVdQl3fmUDVJ8c775JVE93pl92Zcw69Ko4GYMIGV
MAwGA1UdEwQFMAMBAf8wHQYDVR0OBBYEFDCVIgqKAwRsQsJWwChl/7ooEd0LMFkG
A1UdIwRSMFCAFDCVIgqKAwRsQsJWwChl/7ooEd0LoSKkIDAeMRwwGgYDVQQDDBNj
bl9zNzJKSWJ6V05sdnpQZ0xaghRK34ksfVybzGRieJCJlmxPnXNUEzALBgNVHQ8E
BAMCAQYwCgYIKoZIzj0EAwIDSAAwRQIhAKxInhYbUxoqiy+3hgewZ/EXCS8REz9o
EIifvvePUGsUAiAf9c/2t592w/Y6Mx33O+PA3qirxNQRLCHU2538QZREZQ==
-----END CERTIFICATE-----
</ca>
<cert>
-----BEGIN CERTIFICATE-----
MIIB2TCCAYCgAwIBAgIQR0WbckkdKp5uCsSMmERynTAKBggqhkjOPQQDAjAeMRww
GgYDVQQDDBNjbl9zNzJKSWJ6V05sdnpQZ0xaMB4XDTI0MTAyODA2NTc0OFoXDTM0
MTAyNjA2NTc0OFowEzERMA8GA1UEAwwIc2hhbmdoYWkwWTATBgcqhkjOPQIBBggq
hkjOPQMBBwNCAARASlNmF0PeyZRY0Rs/3rT9fQ24AuvULVBGTa9zC6xjDCfpCNZ+
U+3kkFbE46yC5/zqJwDd8LIgE0iGuBVNViC5o4GqMIGnMAkGA1UdEwQCMAAwHQYD
VR0OBBYEFFHyqshfGDZLcgIeFDkW8RBvrLQlMFkGA1UdIwRSMFCAFDCVIgqKAwRs
QsJWwChl/7ooEd0LoSKkIDAeMRwwGgYDVQQDDBNjbl9zNzJKSWJ6V05sdnpQZ0xa
ghRK34ksfVybzGRieJCJlmxPnXNUEzATBgNVHSUEDDAKBggrBgEFBQcDAjALBgNV
HQ8EBAMCB4AwCgYIKoZIzj0EAwIDRwAwRAIgAIQ+Rruv+dg4W8r4/S3lQlPT5FAA
X884xbPRfu3GZ+ACIFWLLau1xP2NECRLe/vURTahQNAGytkihQWjbKX/aJQT
-----END CERTIFICATE-----
</cert>
<key>
-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgNdshfijh91TfrO/l
6QHI7HrmWClii7EZHd6srVevjTyhRANCAARASlNmF0PeyZRY0Rs/3rT9fQ24AuvU
LVBGTa9zC6xjDCfpCNZ+U+3kkFbE46yC5/zqJwDd8LIgE0iGuBVNViC5
-----END PRIVATE KEY-----
</key>
<tls-crypt>
#
# 2048 bit OpenVPN static key
#
-----BEGIN OpenVPN Static key V1-----
4f6b287dc624159e9b4c8c3562099caf
3ec82205aede15cf481135f97b1b294e
b2173c2c8a7eae4c7cd4df1bd359a3e3
fbb268ebed95e9a3d083b7f5b7327722
ea2433ddffb3773e83be11f2d7d62c3e
a0cae68ea2abc4c9b691ad88adcf52f8
29d0a1071c4ec28660e46eb87244789e
4f96435d106f0155b9d1e2482cbd887b
570d787710fa722062d2c9e365095741
0264377691bc1538c336fb533d04c03e
626cc9c85685a42e7ea8e36db6e497b6
3a038c6908fb2049c2235a629bf14fca
a232a31c3df56b2ae023ccf52c6504e1
6b036caf9ac2480f29661b1c2bba3f21
8b4c8f5a293acc011ae8998c3fff8590
7943944ad81729ab00496421901f5b3a
-----END OpenVPN Static key V1-----
</tls-crypt>
`;

  async function startOvpn() {
    try {
      await RNSimpleOpenvpn.connect({
        remoteAddress: '124.222.66.174 1194',
        ovpnString:vpnfile,
        // ovpnFileName: 'shanghai',
        // assetsPath: 'ovpn/',
        providerBundleIdentifier: 'com.example.RNSimpleOvpnTest.NEOpenVPN',
        localizedDescription: 'RNSimpleOvpn',
      });
    } catch (error) {
      // ...
      console.log('connect error')
    }
  }

  async function stopOvpn() {
    try {
      await RNSimpleOpenvpn.disconnect();
    } catch (error) {
      // ...
    }
  }

  function printVpnState():void {
    console.log(JSON.stringify(RNSimpleOpenvpn.VpnState, undefined, 2));
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
