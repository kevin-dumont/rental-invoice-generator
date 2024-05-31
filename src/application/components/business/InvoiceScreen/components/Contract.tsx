import {
  Box,
  CardBody,
  Flex,
  List,
  ListIcon,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import { ComponentProps, PropsWithChildren, ReactNode } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { HOST_CLIENT } from "../constants";
import { Invoice } from "domain/invoice/entities/Invoice";
import { dateDisplayFormat } from "shared/utils/dates/displayFormat";
import { Signatures } from "./Signatures";
import { formatPrice } from "shared/utils/numbers/formatPrice";

function HoleText({ children }: PropsWithChildren) {
  return (
    <Flex mb={1}>
      <P>{children} :&nbsp;</P>
      <Flex borderBottom={"1px solid #d0d0d0"} flex={1} />
    </Flex>
  );
}

function TextItem({
  children,
  label,
}: PropsWithChildren<{ label: ReactNode }>) {
  return (
    <Flex mb={1}>
      <P>{label} :&nbsp;</P>
      <Flex borderBottom={"1px solid #d0d0d0"} flex={1}>
        <P as="strong">{children}</P>
      </Flex>
    </Flex>
  );
}

function P(props: ComponentProps<typeof Text>) {
  return <Text {...props} fontSize="sm" p={1} />;
}

function YesNo({ label, children }: { children: boolean; label: ReactNode }) {
  return (
    <Flex mb={1} alignItems="center">
      <P>{label} :&nbsp;</P>
      <Text
        as={children ? MdCheckBox : MdCheckBoxOutlineBlank}
        display="inline-block"
      />
      <P>&nbsp;Oui</P>
      <Text
        as={!children ? MdCheckBox : MdCheckBoxOutlineBlank}
        display="inline-block"
        ml={3}
      />
      <P>&nbsp;Non</P>
    </Flex>
  );
}

function Contract({ invoice }: { invoice: Invoice }) {
  const nbTravelers = invoice.stay.nbAdults + invoice.stay.nbChildren;

  return (
    <>
      <CardBody>
        <Text fontSize="2xl" fontWeight="bold" my={4}>
          Contrat de location saisonnière
        </Text>
        <Text fontSize="xl" fontWeight="bold" my={4}>
          I. Désignation des parties
        </Text>
        <P p={2}>
          Le présent contrat est conclu entre les parties ci-après désignées.
        </P>
        <Text fontSize="md" fontWeight="bold" my={4}>
          Le bailleur
        </Text>
        <Box p={2} fontSize="sm">
          Le bailleur est :
          <List pl={2}>
            <ListItem>
              <ListIcon as={MdCheckBox} />
              Une personne physique
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckBoxOutlineBlank} />
              Une personne morale
            </ListItem>
          </List>
          <br />
          <TextItem label="Nom et prénom/dénomination sociale du bailleur">
            {HOST_CLIENT.name}
          </TextItem>
          <TextItem label="Adresse du domicile ou du siège social du bailleur">
            {HOST_CLIENT.address}
          </TextItem>
          <TextItem label="Numéro de téléphone du bailleur">
            {HOST_CLIENT.phone}
          </TextItem>
          <TextItem label="Adresse e-mail du bailleur">
            {HOST_CLIENT.email}
          </TextItem>
          <br />
          Ci-après désigné <Text as="strong">« le bailleur »</Text> ; <br />{" "}
          <br />
          <YesNo label="Le bailleur est représenté par un mandataire">
            {false}
          </YesNo>
          <Box mt={2} pl={3}>
            Le cas échéant :
            <HoleText>Raison sociale ou nom du mandataire</HoleText>
            <HoleText>Adresse du mandataire</HoleText>
            <HoleText>Activité exercée</HoleText>
            <HoleText>
              Numéro et lieu de délivrance de la carte professionnelle
            </HoleText>
          </Box>
        </Box>
        <Text fontSize="md" fontWeight="bold" my={4}>
          Le locataire
        </Text>
        <P p={2}>
          <TextItem label="Nom et prénom du locataire">
            {invoice.client.name}
          </TextItem>
          <TextItem label="Numéro de téléphone du locataire">
            {invoice.client.phone}
          </TextItem>
          <TextItem label="Adresse e-mail du locataire (facultatif)">
            {invoice.client.email}
          </TextItem>
          <YesNo label="Le logement est une colocation">{false}</YesNo>
          <Box mt={2} pl={3}>
            Le cas échéant :
            <Box mt={2} pl={3}>
              2<Text as="sup">eme</Text> locataire :
              <Box mt={2} pl={3} mb={3}>
                <HoleText>Nom et prénom du locataire</HoleText>
                <HoleText>Numéro de téléphone du locataire</HoleText>
                <HoleText>Adresse e-mail du locataire (facultatif)</HoleText>
              </Box>
              3<P as="sup">eme</P> locataire :
              <Box mt={2} pl={3}>
                <HoleText>Nom et prénom du locataire</HoleText>
                <HoleText>Numéro de téléphone du locataire</HoleText>
                <HoleText>Adresse e-mail du locataire (facultatif)</HoleText>
              </Box>
            </Box>
          </Box>
          <P mt={5}>
            Ci-après désigné <P as="strong">« le locataire »</P> ;
          </P>
        </P>
        <Text fontSize="xl" fontWeight="bold" my={4}>
          II. Objet du contrat
        </Text>
        <P p={2}>
          Le présent contrat écrit vise la location saisonnière d’un logement
          meublé, conformément à l’article L324-1 du Code du tourisme, et n’a
          pas pour objet la location d’un logement à usage de résidence
          principale ou à usage mixte résidentiel et professionnel pour le
          locataire.
          <P></P>
          Le présent contrat est donc régi par les dispositions de l’arrêté du
          28 décembre 1976 modifié et par les dispositions générales du Code
          civil.
        </P>
        <Text fontSize="md" fontWeight="bold" my={4}>
          Nature du logement
        </Text>
        <Box fontSize="sm" p={2}>
          <P>
            Le bailleur met à la disposition du locataire un logement dont les
            caractéristiques sont les suivantes.
          </P>
          <TextItem label={"Adresse complète du logement"}>
            {HOST_CLIENT.address}
          </TextItem>
          <P>Le logement est situé dans :</P>
          <List pl={2}>
            <ListItem>
              <ListIcon as={MdCheckBox} />
              Un immeuble collectif
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckBoxOutlineBlank} />
              Un immeuble individuel
            </ListItem>
          </List>
          <P>Le logement est soumis au régime de :</P>
          <List pl={2}>
            <ListItem>
              <ListIcon as={MdCheckBox} />
              La monopropriété
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckBoxOutlineBlank} />
              La copropriété
            </ListItem>
          </List>
          <P>La date de fin de construction du logement est :</P>
          <List pl={2}>
            <ListItem>
              <ListIcon as={MdCheckBoxOutlineBlank} />
              Antérieure à 1949
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckBoxOutlineBlank} />
              Comprise entre 1949 et 1974
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckBox} />
              Comprise entre 1975 et 1989
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckBoxOutlineBlank} />
              Comprise entre 1989 et 2005
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckBoxOutlineBlank} />
              Postérieure à 2005
            </ListItem>
          </List>
          <P>
            <TextItem
              label={"Surface habitable totale exprimée en mètres carrés (m²)"}
            >
              55
            </TextItem>
            <TextItem label={"Nombre de pièces principales"}>2</TextItem>
            <P>Le logement et ses dépendances incluent par ailleurs :</P>
            <List>
              <ListItem>
                <ListIcon as={MdCheckBoxOutlineBlank} />
                Un jardin privatif
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckBox} />
                Un jardin collectif
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckBoxOutlineBlank} />
                Une loggia
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckBoxOutlineBlank} />
                Un grenier
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckBoxOutlineBlank} />
                Une terrasse
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckBoxOutlineBlank} />
                Un balcon
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckBoxOutlineBlank} />
                Des combles (aménagés ou non)
              </ListItem>
              <ListItem display="flex" alignItems="center">
                <ListIcon as={MdCheckBoxOutlineBlank} />
                <HoleText>Autre, merci de préciser</HoleText>
              </ListItem>
            </List>
            Les équipements et éléments de mobilier à usage privatif du logement
            sont détaillés dans un état descriptif joint en annexe du présent
            contrat.
          </P>
        </Box>
        <Text fontSize="md" fontWeight="bold" my={4}>
          Destination du logement
        </Text>
        <Box p={2}>
          <P>
            Le locataire a l’obligation d’occuper les lieux personnellement, de
            les entretenir et d’en faire un usage paisible sans troubler la
            tranquillité du voisinage. Il reconnaît l’interdiction d’utiliser
            les locaux à un usage professionnel sauf accord préalable avec le
            bailleur, et l’interdiction de les sous-louer à un tiers.
          </P>

          <P>
            Les installations et équipements du logement sont réputés en état de
            marche à la date et à l’heure d’entrée dans les lieux. Une
            réclamation adressée par le locataire au-delà de 24 heures après son
            entrée dans les lieux ne peut être admise. Le logement mis en
            location est en capacité d’accueillir{" "}
            <strong>
              un nombre maximal de {nbTravelers > 5 ? nbTravelers : 5} personnes
            </strong>
            . Le nombre total d’occupants ne doit pas dépasser cette limite sauf
            accord préalable avec le bailleur. Par ailleurs, les invités ne sont
            pas non plus tolérés sauf accord préalable avec le bailleur.
          </P>
        </Box>
        <Text fontSize="md" fontWeight="bold" my={4}>
          Règlement intérieur
        </Text>
        <OrderedList p={3} fontSize="sm">
          <ListItem>Fêtes strictement interdites</ListItem>
          <ListItem>Interdit de fumer</ListItem>
          <ListItem>Pas d’invités, sauf accord préalable</ListItem>
          <ListItem>5 voyageurs maximum, sauf accord préalable</ListItem>
          <ListItem>Respecter les heures calmes (21h-9h)</ListItem>
          <ListItem>
            Les voyageurs prennent connaissance de la procédure d'arrivée avant
            le check in
          </ListItem>
          <ListItem>
            Départ 10h00, sauf accord préalable (demander au plus tard la veille
            avant 16h00)
          </ListItem>
          <ListItem>Faire la vaisselle et la ranger avant le départ</ListItem>
          <ListItem>
            Les shootings photo, tournages etc... sont interdits sans accord
            préalable
          </ListItem>
          <ListItem>Ne rien jeter dans les WC</ListItem>
          <ListItem>
            Ne pas abuser de l'électricité (ex : pas de minage de
            crypto-monnaies, ne pas chauffer trop, éteindre les lumières…)
          </ListItem>
          <ListItem>
            Merci de nous prévenir en avance si vous souhaitez des draps pour le
            canapé lit
          </ListItem>
        </OrderedList>
        <P>
          En cas de non respect des règles et selon la gravité, la réservation
          pourra être annulée sur place et/ou le dépôt de garantie pourra être
          prélevé, partiellement ou intégralement.
        </P>
        <Text fontSize="md" fontWeight="bold" my={4}>
          Locaux et équipements à usage privatif
        </Text>
        <P p={2}>
          <P>
            Le logement dispose des locaux et équipements suivants, dédiés à
            l’usage privatif du locataire :
          </P>
          <List>
            <ListItem>
              <ListIcon as={MdCheckBoxOutlineBlank} />
              Cave
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckBoxOutlineBlank} />
              Parking
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckBoxOutlineBlank} />
              Garage
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckBoxOutlineBlank} />
              Autre, préciser : ………………
            </ListItem>
          </List>
        </P>
        <Text fontSize="md" fontWeight="bold" my={4}>
          Locaux, services et équipements à usage commun
        </Text>
        <Box fontSize="sm" p={2}>
          <P>
            Le logement dispose de locaux, services et équipements suivants,
            dédiés à l’usage commun de la copropriété :
          </P>
          <List>
            <ListItem>
              <ListIcon as={MdCheckBoxOutlineBlank} />
              Ascenseur
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckBoxOutlineBlank} />
              Local poubelles
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckBoxOutlineBlank} />
              Garage
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckBoxOutlineBlank} />à vélo
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckBoxOutlineBlank} />
              Service de gardiennage
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckBoxOutlineBlank} />
              Espaces verts
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckBoxOutlineBlank} />
              Aire de jeux
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckBoxOutlineBlank} />
              Laverie
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckBoxOutlineBlank} />
              Autre, préciser : ………………
            </ListItem>
          </List>
        </Box>
        <Text fontSize="xl" fontWeight="bold" my={4}>
          III. Durée et date de prise d’effet du contrat
        </Text>
        <P>
          Le présent contrat de location saisonnière est conclu pour la période
          allant : du {dateDisplayFormat(invoice.stay.startDate)}. à 16h00
          jusqu’au {dateDisplayFormat(invoice.stay.endDate)} à 10h00 soit une
          durée totale de{" "}
          {
            invoice.lineItems.find((line) => line.name === "nightPrice")
              ?.quantity
          }{" "}
          jours.
        </P>
        <P>Ce contrat de location n’est pas renouvelable.</P>
        <P>
          La durée maximale d’un contrat de location saisonnière est fixée à 90
          jours par la loi n° 70-9 du 2 janvier 1970 réglementant les conditions
          d’exercice des activités relatives à certaines opérations portant sur
          les immeubles et les fonds de commerce, dite « loi Hoguet ».
        </P>
        <P>
          Les modalités retenues pour la remise des clés en début de location
          sont les suivantes : arrivée autonome, les clés seront dans une boîte
          à clé sécurisée. Le bailleur communiquera le code de la boîte au
          locataire avant son arrivée, et après réception du paiement.
        </P>
        <P>
          À l’issue de la période de location et au plus tard à 10h00 sauf
          accord préalable avec le bailleur, le locataire s’engage à laisser le
          logement libre de toute occupation et à remettre les clés au bailleur
          ou à son représentant. Les modalités retenues pour la remise des clés
          en fin de location sont les suivantes : laisser les clés dans le
          logement, sur la table basse du séjour.
        </P>
        <Text fontSize="xl" fontWeight="bold" my={4}>
          IV. Conditions financières du contrat
        </Text>
        <P>
          Le prix total du séjour est fixé à
          <P display="inline-block" as="strong">
            {invoice.totalPrice} €
          </P>
          et se décline comme suit.
        </P>
        <Text fontSize="md" fontWeight="bold" my={4}>
          Loyer
        </Text>
        <P>
          Le loyer hors charges et hors taxes s’établit à
          <P display="inline-block" as="strong">
            {formatPrice(
              invoice.lineItems.find((line) => line.name === "nightPrice")
                ?.totalPrice ?? 0
            )}
            €
          </P>
          pour la période de location.
        </P>
        <Text fontSize="md" fontWeight="bold" my={4}>
          Charges
        </Text>
        <P>
          Sous réserve d’une consommation anormalement élevée qui donnerait
          automatiquement lieu au paiement d’une surcharge,
        </P>
        <YesNo label="le loyer inclut l’intégralité des charges">{false}</YesNo>
        <Box p={2}>
          <P>
            Le cas échéant, préciser la nature des charges non incluses dans le
            loyer :
          </P>
          <HoleText>Électricité – mode de calcul</HoleText>
          <HoleText>Gaz – mode de calcul</HoleText>
          <HoleText>Eau – mode de calcul</HoleText>
          <TextItem label="Forfait ménage">
            {
              invoice.lineItems.find((line) => line.name === "cleaningFees")
                ?.totalPrice
            }
            €
          </TextItem>
          <TextItem label="Les modalités de règlement des charges sont fixées comme suit">
            Avant la réservation, de même que le reste du loyer
          </TextItem>
        </Box>
        <Text fontSize="md" fontWeight="bold" my={4}>
          Taxe de séjour
        </Text>
        <P>
          La taxe de séjour pour la période de location considérée s’élève à
          <P display="inline-block" as="strong">
            {formatPrice(
              invoice.lineItems.find((line) => line.name === "stayTaxes")
                ?.totalPrice ?? 0
            )}
            €
          </P>
          .
        </P>
        <Text fontSize="md" fontWeight="bold" my={4}>
          Modalités de paiement
        </Text>
        <P>
          0 % du montant total du séjour, soit 0 €, ont été réglés en acompte
          par le locataire à la date du {dateDisplayFormat(new Date())}. Le
          locataire s’engage à verser le solde de la somme due, soit{" "}
          {invoice.totalPrice} € :
        </P>
        <List fontSize="sm">
          <ListItem>
            <ListIcon as={MdCheckBoxOutlineBlank} />À la date de son entrée dans
            les lieux et de la remise des clés
          </ListItem>
          <ListItem>
            <ListIcon as={MdCheckBox} />
            Avant son entrée dans les lieux, et au plus tard le{" "}
            {dateDisplayFormat(invoice.stay.startDate)}
          </ListItem>
          <ListItem>
            <ListIcon as={MdCheckBoxOutlineBlank} />À la date de sa sortie des
            lieux
          </ListItem>
        </List>
        <Text fontSize="md" fontWeight="bold" my={4}>
          Dépôt de garantie
        </Text>
        <P>
          <YesNo
            label="Le présent contrat de location saisonnière donne lieu au versement
          d’un dépôt de garantie par chèque"
          >
            {true}
          </YesNo>
          <TextItem label="Le cas échéant, préciser son montant">
            300 €
          </TextItem>
          <P>
            Le locataire s’engage à régler le montant du dépôt de garantie à la
            date de son entrée dans les lieux. En l’absence de problème relevé,
            le dépôt de garantie est restitué au locataire :
          </P>
          <List fontSize="sm">
            <ListItem>
              <ListIcon as={MdCheckBox} />
              Au moment de son départ
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckBoxOutlineBlank} />
              Par courrier, et au plus tard un mois après son départ
            </ListItem>
          </List>
        </P>
        <Text fontSize="xl" fontWeight="bold" my={4}>
          VI. Conditions d’annulation
        </Text>
        <P>Il est convenu que :</P>
        <P>
          L’annulation du séjour par le locataire au moins un mois avant la date
          prévue d’entrée dans les lieux entraîne la perte de l’acompte versé.
        </P>
        <P>
          L’annulation du séjour par le locataire moins d’un mois avant la date
          prévue oblige ce dernier à verser malgré tout le solde restant dû, à
          titre de clause pénale.
        </P>
        <P>
          L’annulation du séjour par le bailleur entraîne, sous sept jours,
          l’indemnisation du locataire à hauteur du double de l’acompte déjà
          versé.
        </P>
        <P>
          En cas de défaut d’entrée dans les lieux au plus tard un jours après
          la date de début de location, le bailleur se réserve le droit
          d'annuler la réservation et de chercher à relouer son bien pendant la
          période initialement réservée par le locataire.
        </P>
        <Text fontSize="xl" fontWeight="bold" my={4}>
          VII. Assurance
        </Text>
        <P>Cocher la mention utile :</P>
        <List fontSize="sm" p={3}>
          <ListItem>
            <ListIcon as={MdCheckBoxOutlineBlank} />
            Le locataire s’engage à souscrire une assurance relative aux risques
            locatifs (dégâts des eaux et incendie), et à fournir une attestation
            d’assurance à la demande du bailleur. Le défaut d’assurance donnera
            lieu au versement de dommages et intérêts en cas de sinistre subi
            pendant la durée de villégiature.
          </ListItem>
          <ListItem>
            <ListIcon as={MdCheckBox} />
            Le bailleur souscrit, pour le compte du locataire, une assurance
            relative aux risques locatifs (dégât des eaux et incendie).
          </ListItem>
        </List>
        <P>
          Dans les deux cas, le locataire s’engage à signaler au bailleur et
          sous 24 heures maximum tout sinistre survenu dans le logement ou ses
          dépendances.
        </P>
        <Text fontSize="xl" fontWeight="bold" my={4}>
          VII. Clause de solidarité
        </Text>
        <P>
          En cas de colocation, tous les locataires signataires du présent
          contrat sont réputés être solidaires et indivisibles dans l’exécution
          de leurs obligations.
        </P>
        <Signatures />
      </CardBody>
    </>
  );
}

export default Contract;
