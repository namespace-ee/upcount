import { Trans } from "@lingui/react/macro";
import { I18nProvider } from "@lingui/react";
import { Document, Font, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { i18n } from "@lingui/core";
import { Dayjs } from "dayjs";

Font.register({
  family: "Montserrat",
  fonts: [
    {
      src: "/fonts/montserrat/Montserrat-SemiBold.ttf",
      fontWeight: 600,
    }
  ],
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 50,
    fontSize: 10,
  },
  title: {
    fontFamily: "Montserrat",
    fontSize: 24,
    fontWeight: "semibold",
  },
  
  text: {
    fontFamily: "Montserrat",
    fontSize: 10,
    marginBottom: 2,
  },
  
  table: {
    // @ts-expect-error - "table" is not a valid display value
    display: "table",
    width: "auto",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableRowBordered: {
    borderTopStyle: "solid",
    borderRightStyle: "solid",
    borderBottomStyle: "solid",
    borderLeftStyle: "solid",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0,
    borderBottomColor: "#868686",
  },
  tableRowBorderedBold: {
    borderBottomWidth: 2,
  },
  tableCol: {
    fontFamily: "Montserrat",
    fontSize: 8,
    padding: 8,
  },
  tableHeader: {
    fontWeight: "medium",
  },

  lineItemDescription: {
    width: "56%",
  },
  lineItemQuantity: {
    width: "10%",
  },
  
  lineItemTotal: {
    width: "10%",
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
    marginBottom: 36,
  },
});

interface Client {
  id: string 
  name: string 
}

export const TimeReportPDF = ({
  dateRange,
  tableData,
  client,          
}: {
  dateRange: [Dayjs, Dayjs]; 
  tableData: Array<{
    key: string;
    name: string;
    entries: number;
    duration: number;
    formattedDuration: string;
  }>;
  client?: Client;
}) => {
  return (
    <I18nProvider i18n={i18n}>
      <Document>
        <Page size="A4" style={styles.container}>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.title}><Trans>Time Report</Trans></Text>
              <Text style={styles.text}>
                {dateRange[0].format('MMM D, YYYY')} - {dateRange[1].format('MMM D, YYYY')}
              </Text>
              {client && <Text style={styles.text}>{client.name}</Text>}
            </View>
            
          </View>

          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableRowBordered, styles.tableRowBorderedBold]}>
              <Text style={[styles.tableCol, styles.lineItemDescription, styles.tableHeader]}>Name</Text>
              <Text style={[styles.tableCol, styles.lineItemQuantity, styles.tableHeader]}>Entries</Text>
              <Text style={[styles.tableCol, styles.lineItemTotal, styles.tableHeader]}>Total Time</Text>
            </View>
            
            {tableData.map((row) => (
              <View key={row.key} style={[styles.tableRow, styles.tableRowBordered]}>
                <Text style={[styles.tableCol, styles.lineItemDescription]}>{row.name}</Text>
                <Text style={[styles.tableCol, styles.lineItemQuantity]}>{row.entries}</Text>
                <Text style={[styles.tableCol, styles.lineItemTotal]}>{row.formattedDuration}</Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    </I18nProvider>
  );
};